import { z } from 'zod'

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: z.string().email('Podaj prawidłowy adres email'),
  phone: z
    .string()
    .regex(
      /^(\+48)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/,
      'Podaj prawidłowy numer telefonu (9 cyfr)'
    ),
  street: z.string().min(3, 'Podaj ulicę i numer domu'),
  city: z.string().min(2, 'Podaj miasto'),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/, 'Kod pocztowy w formacie XX-XXX'),
  notes: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Musisz zaakceptować regulamin',
  }),
  acceptMarketing: z.boolean().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
