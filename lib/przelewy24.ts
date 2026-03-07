// Przelewy24 API integration helper
// Sandbox: https://sandbox.przelewy24.pl
// Production: https://secure.przelewy24.pl

import crypto from 'crypto'

const isSandbox = process.env.P24_SANDBOX !== 'false'
const BASE_URL = isSandbox ? 'https://sandbox.przelewy24.pl' : 'https://secure.przelewy24.pl'

const MERCHANT_ID = Number(process.env.PRZELEWY24_MERCHANT_ID ?? '1234')
const POS_ID = Number(process.env.PRZELEWY24_POS_ID ?? '1234')
const API_KEY = process.env.PRZELEWY24_API_KEY ?? 'sandbox_api_key'
const CRC_KEY = process.env.PRZELEWY24_CRC_KEY ?? 'sandbox_crc_key'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export interface P24TransactionParams {
  sessionId: string // nasz unikalny ID zamówienia
  amount: number // kwota w groszach (cena × 100)
  currency: string // 'PLN'
  description: string
  email: string
  country: string // 'PL'
  language: string // 'pl'
}

export interface P24RegisterResult {
  token: string
  redirectUrl: string
}

function sha384(data: string): string {
  return crypto.createHash('sha384').update(data).digest('hex')
}

function generateSign(params: Record<string, unknown>): string {
  const jsonStr = JSON.stringify(params)
  return sha384(jsonStr + CRC_KEY)
}

function getAuthHeader(): string {
  return 'Basic ' + Buffer.from(`${POS_ID}:${API_KEY}`).toString('base64')
}

export async function registerTransaction(
  params: P24TransactionParams
): Promise<P24RegisterResult> {
  const sign = generateSign({
    sessionId: params.sessionId,
    merchantId: MERCHANT_ID,
    amount: params.amount,
    currency: params.currency,
    crc: CRC_KEY,
  })

  const body = {
    merchantId: MERCHANT_ID,
    posId: POS_ID,
    sessionId: params.sessionId,
    amount: params.amount,
    currency: params.currency,
    description: params.description,
    email: params.email,
    country: params.country,
    language: params.language,
    urlReturn: `${APP_URL}/zamowienie/sukces?session=${params.sessionId}`,
    urlStatus: `${APP_URL}/api/payments/p24`,
    sign,
  }

  const res = await fetch(`${BASE_URL}/api/v1/transaction/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(`P24 register failed: ${JSON.stringify(error)}`)
  }

  const data = await res.json()
  const token = data.data?.token as string

  return {
    token,
    redirectUrl: `${BASE_URL}/trnRequest/${token}`,
  }
}

export function verifyWebhookSign(params: {
  merchantId: number
  posId: number
  sessionId: string
  amount: number
  originAmount: number
  currency: string
  orderId: number
  methodId: number
  statement: string
  sign: string
}): boolean {
  const expected = sha384(
    JSON.stringify({
      merchantId: params.merchantId,
      posId: params.posId,
      sessionId: params.sessionId,
      amount: params.amount,
      originAmount: params.originAmount,
      currency: params.currency,
      orderId: params.orderId,
      methodId: params.methodId,
      statement: params.statement,
      crc: CRC_KEY,
    })
  )
  return expected === params.sign
}

export async function verifyTransaction(params: {
  merchantId: number
  posId: number
  sessionId: string
  amount: number
  currency: string
  orderId: number
}): Promise<boolean> {
  const sign = generateSign({
    merchantId: params.merchantId,
    posId: params.posId,
    sessionId: params.sessionId,
    amount: params.amount,
    currency: params.currency,
    orderId: params.orderId,
    crc: CRC_KEY,
  })

  const res = await fetch(`${BASE_URL}/api/v1/transaction/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({ ...params, sign }),
  })

  return res.ok
}
