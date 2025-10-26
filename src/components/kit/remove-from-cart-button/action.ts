'use server'

import { revalidatePath } from 'next/cache'

import { removeFromCart } from '~/adapters/api/order'

export const removeFromCartAction = async (productId: number) => {
  await removeFromCart(productId)
  revalidatePath('/')
}
