import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Minimum 8 characters required'),
})

export const registerSchema = z.object({
  name: z.string().trim().min(3, 'Minimum 3 characters required'),
  email: z.string().email(),
  password: z.string().min(8, 'Minimum 8 characters required'),
})
