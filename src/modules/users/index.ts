import { login, register } from '~/adapters/api/auth'

export const createUser = async (email: string, password: string): Promise<{} | null> => {
  try {
    return register(email, password)
  } catch (error) {
    console.log(error)
  }
}

export const signInUser = async (email: string, password: string): Promise<{ accessToken: string } | null> => {
  try {
    return login(email, password)
  } catch (error) {
    console.log(error)
    return null
  }
}
