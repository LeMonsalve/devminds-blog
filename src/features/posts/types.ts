import { z } from 'zod'
import { createPostSchema } from './schemas'

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
