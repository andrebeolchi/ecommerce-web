import { NextResponse } from 'next/server'

import { auth } from './core/auth'

export const DEFAULT_REDIRECT = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const PUBLIC_ROUTES = [LOGIN_ROUTE, REGISTER_ROUTE]

export default auth(req => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

  if (isPublicRoute && isAuthenticated) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN_ROUTE, nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
