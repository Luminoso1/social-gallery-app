import { z } from 'zod'

export const LoginSchema = z.object({
  nick: z.string().min(4, 'Nick is required').max(8, 'Max 8 characters'),
  password: z
    .string()
    .min(4, 'Password is required')
    .max(12, 'Max 12 character')
})

export const RegisterSchema = z.object({
  nick: z.string().min(4, 'Min 4 characters').max(8, 'Max 8 characters'),
  email: z.string().min().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(8, 'Password is required')
    .max(16, 'Max 16 characters')
})
