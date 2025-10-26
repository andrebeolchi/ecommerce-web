import { createAxiosInstance } from '~/adapters/axios-instance'
import { BASE_URL } from '~/utils/config'

const fetch = createAxiosInstance(BASE_URL!)

export const login = async (email: string, password: string): Promise<{ accessToken: string } | null> => {
  try {
    const { data } = await fetch<{ accessToken: string }>({
      method: 'POST',
      url: '/auth/login',
      data: { email, password },
    })
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const register = async (email: string, password: string): Promise<{} | null> => {
  try {
    const { data } = await fetch<{}>({
      method: 'POST',
      url: '/auth/register',
      data: { email, password },
    })
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
