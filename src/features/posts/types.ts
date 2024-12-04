import { z } from 'zod'
import { createPostSchema } from './schemas'

export type CreatePostSchema = z.infer<typeof createPostSchema>
