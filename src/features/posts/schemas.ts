import { z } from 'zod'

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Minimum 5 characters required')
    .max(40, 'Maximum 40 characters allowed'),
  preDescription: z
    .string()
    .min(10, 'Minimum 10 characters required')
    .max(200, 'Maximum 200 characters allowed'),
  fullDescription: z
    .string()
    .min(20, 'Minimum 20 characters required')
    .max(1000, 'Maximum 1000 characters allowed'),
})
