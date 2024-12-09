import { z } from 'zod'

export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Minimum 5 characters required')
    .max(55, 'Maximum 55 characters allowed'),
  preDescription: z
    .string()
    .min(10, 'Minimum 10 characters required')
    .max(200, 'Maximum 200 characters allowed'),
  fullDescription: z
    .string()
    .min(20, 'Minimum 20 characters required')
    .max(6000, 'Maximum 6000 characters allowed'),
})

export const createPostSchema = postFormSchema.required()

export const updatePostSchema = createPostSchema.partial()

export const postIdSchema = z.string().min(10)
