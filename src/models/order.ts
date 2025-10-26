export interface Cart {
  id: number
  customerId: number
  createdAt: Date
  updatedAt: Date
  lineItems: LineItem[]
}

export interface LineItem {
  id: number
  productId: number
  cartId: number
  itemName: string
  variant: null
  quantity: number
  price: string
  createdAt: Date
  updatedAt: Date
  availability: number
}

export interface Order {
  message: string
  orderNumber: number
}
