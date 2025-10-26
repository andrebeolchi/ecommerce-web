'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

import { IS_PRODUCTION } from '~/utils/config'

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    if (IS_PRODUCTION) {
      Sentry.captureException(error)
    }
  }, [error])

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
