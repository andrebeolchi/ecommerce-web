import { captureException } from '@sentry/nextjs'
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { BASE_URL, NEXT_AUTH_SECRET } from '~/utils/config'

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials.email as string
        const password = credentials.password as string

        if (!email || !password) {
          return null
        }

        try {
          const { data } = await axios({
            method: 'POST',
            url: `${BASE_URL}/auth/login`,
            data: {
              email,
              password,
            },
          })

          console.log(data)

          if (data?.token) {
            return {
              id: data?.userId,
              email: data?.email,
              token: data?.token,
            }
          }

          return null
        } catch (error) {
          captureException(error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        try {
          const { data } = await axios({
            method: 'GET',
            url: `${BASE_URL}/auth/refresh`,
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })

          session.user = {
            id: data.userId,
            email: data.email,
          }
        } catch (error) {
          captureException(error)
        }

        session.accessToken = token.accessToken
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: NEXT_AUTH_SECRET,
})
