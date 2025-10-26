'use server'

import { revalidatePath } from 'next/cache'

import { addToCart, updateCartItem } from '~/adapters/api/order'

export const addToCartAction = async (productId: number, quantity: number) => {
  await addToCart(productId, quantity)
  revalidatePath('/')
}

export const updateCartItemAction = async (productId: number, quantity: number) => {
  await updateCartItem(productId, quantity)
  revalidatePath('/')
}
