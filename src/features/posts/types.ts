import { z } from 'zod'
import { createPostSchema, updatePostSchema } from './schemas'

export type Post = {
  $id: string
  userId: string
  title: string
  preDescription: string
  fullDescription: string
}

export type Author = {
  $id: string
  name: string
  email: string
}

export type CreatePostSchema = z.infer<typeof createPostSchema>

export type UpdatePostSchema = z.infer<typeof updatePostSchema>

export type PostFormSchema = CreatePostSchema
