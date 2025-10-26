import { createAxiosInstance } from '~/adapters/axios-instance'
import { Cart } from '~/models/order'
import { BASE_URL } from '~/utils/config'

const fetch = createAxiosInstance(BASE_URL!)

export const getCart = async (): Promise<Cart | null> => {
  try {
    const { data } = await fetch<Cart>({
      method: 'GET',
      url: '/cart',
    })
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const addToCart = async (productId: number, quantity: number) => {
  const { data } = await fetch<number>({
    url: '/cart/add',
    method: 'POST',
    data: { productId, quantity },
  })
  return data
}
