import { createAxiosInstance } from '~/adapters/axios-instance'
import { CatalogProduct } from '~/models/catalog'
import { BASE_URL } from '~/utils/config'

const fetch = createAxiosInstance(BASE_URL!)

export const getAllProducts = async () => {
  const { data } = await fetch<CatalogProduct[]>({
    method: 'GET',
    url: '/products',
  })
  return data
}
