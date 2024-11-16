import { z } from 'zod'
import { loginSchema, registerSchema } from '@/features/auth/schemas'

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
