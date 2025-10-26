import { getCart } from '~/adapters/api/order'

import { AddButton } from './button'

interface AddToCartButtonProps {
  product: {
    id: number
    stock: number
  }
}

export const AddToCartButton = async ({ product }: AddToCartButtonProps) => {
  const cart = await getCart()
  const cartItem = cart?.lineItems.find(item => item.productId === product.id)

  return <AddButton product={product} cartItem={cartItem} />
}
