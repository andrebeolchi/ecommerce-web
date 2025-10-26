'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LucideCoins } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '~/lib/utils'

import { Button } from '~/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'

import { createUserAction } from './action'
import { PasswordInput } from './password-input'

const registerSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter()
  const form = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log(data)
      await createUserAction({
        email: data.email,
        password: data.password,
      })

      toast.success('Account created successfully. You can now log in.')
      router.push('/login')
    } catch {
      toast.error('Something went wrong. Please try again.')
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
              <span className="sr-only">e-commerce.</span>
            </a>
            <h1 className="text-xl font-bold">e-commerce.</h1>
            <FieldDescription>
              Already have an account? <Link href="/login">Login</Link>
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
            <Button type="submit">Register</Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By clicking register, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
