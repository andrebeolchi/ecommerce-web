import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '~/components/kit/theme/theme-provider'
import { Toaster } from '~/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ecommerce',
  description: 'A simple e-commerce app',
}

const EnvIndicator = () => (
  <div className="z-50 fixed bottom-3 right-3 p-3 text-xs bg-destructive text-destructive-foreground rounded">
    env: {process.env.VERCEL_ENV || 'local'}
  </div>
)

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div>{children}</div>

          {process.env.VERCEL_ENV !== 'production' && <EnvIndicator />}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
