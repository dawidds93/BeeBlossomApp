"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/lib/store/cart"

export default function CartSync() {
  const { data: session, status } = useSession()
  const syncUser = useCartStore((state) => state.syncUser)

  useEffect(() => {
    if (status === "loading") return
    
    if (session?.user?.id) {
      syncUser(session.user.id)
    } else {
      syncUser(null)
    }
  }, [session, status, syncUser])

  return null
}
