import axios, { AxiosInstance } from 'axios'

import { auth } from '~/core/auth'

export const createAxiosInstance = (
  baseURL: string,
  { timeout, authRequired } = { timeout: 10000, authRequired: true }
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    timeout,
  })

  if (!authRequired) {
    // Interceptor de requisição
    axiosInstance.interceptors.request.use(
      async config => {
        const session = (await auth()) as { accessToken?: string } | null
        if (session?.accessToken) {
          config.headers['Authorization'] = `Bearer ${session?.accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )
  }

  return axiosInstance
}
