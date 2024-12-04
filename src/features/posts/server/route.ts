import { createPostSchema } from '@/features/posts/schemas'
import { sessionMiddleware } from '@/lib/session-middleware'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { ID } from 'node-appwrite'

export const postsApp = new Hono().post(
  '/',
  sessionMiddleware,
  zValidator('json', createPostSchema),
  async (c) => {
    const { title, preDescription, fullDescription } = c.req.valid('json')

    const {
      NEXT_PUBLIC_APPWRITE_DB: dbId,
      NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION: postsId,
    } = process.env

    const databases = c.get('databases')
    const user = c.get('user')

    const post = await databases.createDocument(dbId!, postsId!, ID.unique(), {
      userId: user.$id,
      title,
      preDescription,
      fullDescription,
    })

    return c.json({ data: post })
  },
)
