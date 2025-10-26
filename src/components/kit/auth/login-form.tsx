'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { captureException } from '@sentry/nextjs'
import { LucideCoins } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '~/lib/utils'

import { Button } from '~/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'

import { PasswordInput } from './password-input'

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: LoginFormData) => {
    try {
      signIn('credentials', {
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      captureException(error)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md size-8">
                <LucideCoins className="size-6" />
              </div>
              <span className="sr-only">e-commerce</span>
            </a>
            <h1 className="text-xl font-bold">e-commerce.</h1>
            <FieldDescription>
              {`Don\'t have an account? `}
              <Link href="/register">Sign up</Link>
            </FieldDescription>
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input {...field} id={field.name} type="email" placeholder="m@example.com" required />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <PasswordInput {...field} id={field.name} placeholder="********" required />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Login</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
