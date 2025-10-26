export const BASE_URL = process.env.BASE_URL

export const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET

export const VERCEL_ENV = process.env.VERCEL_ENV || 'development'

export const IS_PRODUCTION = VERCEL_ENV === 'production'
