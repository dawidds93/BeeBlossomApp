import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  slug: string
}

type CartStore = {
  items: CartItem[]
  carts: Record<string, CartItem[]>
  activeUserId: string | null
  isOpen: boolean
  syncUser: (userId: string | null) => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      carts: {},
      activeUserId: null,
      isOpen: false,

      syncUser: (userId) => {
        const state = get()
        const currentId = state.activeUserId || 'guest'
        const newId = userId || 'guest'
        if (currentId === newId) return

        const currentCarts = { ...state.carts, [currentId]: state.items }
        const newItems = currentCarts[newId] || []

        set({
          activeUserId: userId,
          carts: currentCarts,
          items: newItems
        })
      },

      addItem: (newItem) => {
        set((state) => {
          const activeId = state.activeUserId || 'guest'
          const existing = state.items.find((i) => i.id === newItem.id)
          let newItems
          if (existing) {
            newItems = state.items.map((i) =>
              i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          } else {
            newItems = [...state.items, { ...newItem, quantity: 1 }]
          }
          return { items: newItems, carts: { ...state.carts, [activeId]: newItems } }
        })
      },

      removeItem: (id) => {
        set((state) => {
          const activeId = state.activeUserId || 'guest'
          const newItems = state.items.filter((i) => i.id !== id)
          return { items: newItems, carts: { ...state.carts, [activeId]: newItems } }
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => {
          const activeId = state.activeUserId || 'guest'
          const newItems = state.items.map((i) => (i.id === id ? { ...i, quantity } : i))
          return { items: newItems, carts: { ...state.carts, [activeId]: newItems } }
        })
      },

      clearCart: () => {
        set((state) => {
          const activeId = state.activeUserId || 'guest'
          return { items: [], carts: { ...state.carts, [activeId]: [] } }
        })
      },
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'beeblossom-cart',
    }
  )
)
