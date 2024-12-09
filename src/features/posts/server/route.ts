import { createPostSchema, updatePostSchema } from '@/features/posts/schemas'
import { sessionMiddleware } from '@/lib/session-middleware'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { Client, Databases, ID, Query, Users } from 'node-appwrite'
import { mapToPost, mapToPosts } from '../mappers'
import { Author } from '../types'

export const postsApp = new Hono()
  .post(
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

      const post = await databases.createDocument(
        dbId!,
        postsId!,
        ID.unique(),
        {
          userId: user.$id,
          title,
          preDescription,
          fullDescription,
        },
      )

      return c.json({ data: post })
    },
  )

  .get('/', async (c) => {
    const {
      NEXT_PUBLIC_APPWRITE_ENDPOINT: endpoint,
      NEXT_PUBLIC_APPWRITE_PROJECT: projectId,
      NEXT_PUBLIC_APPWRITE_DB: dbId,
      NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION: postsId,
    } = process.env

    const client = new Client().setEndpoint(endpoint!).setProject(projectId!)
    const databases = new Databases(client)

    const postList = await databases.listDocuments(dbId!, postsId!, [
      Query.orderDesc('$updatedAt'),
    ])
    const posts = mapToPosts(postList.documents)

    return c.json({ data: posts })
  })
  .get('/by-user', sessionMiddleware, async (c) => {
    const {
      NEXT_PUBLIC_APPWRITE_DB: dbId,
      NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION: postsId,
    } = process.env

    const user = c.get('user')
    const databases = c.get('databases')

    const postList = await databases.listDocuments(dbId!, postsId!, [
      Query.equal('userId', user.$id),
      Query.orderDesc('$updatedAt'),
    ])
    const posts = mapToPosts(postList.documents)

    return c.json({ data: posts })
  })
  .get('/:id', async (c) => {
    const id = c.req.param('id')
    const {
      NEXT_PUBLIC_APPWRITE_ENDPOINT: endpoint,
      NEXT_PUBLIC_APPWRITE_PROJECT: projectId,
      NEXT_PUBLIC_APPWRITE_DB: dbId,
      NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION: postsId,
    } = process.env

    const client = new Client().setEndpoint(endpoint!).setProject(projectId!)
    const databases = new Databases(client)

    const postDocument = await databases.getDocument(dbId!, postsId!, id)
    const post = mapToPost(postDocument)

    return c.json({ data: post })
  })
  .get('/author/:id', async (c) => {
    const id = c.req.param('id')
    const {
      NEXT_PUBLIC_APPWRITE_ENDPOINT: endpoint,
      NEXT_PUBLIC_APPWRITE_PROJECT: projectId,
      NEXT_PUBLIC_APPWRITE_API_KEY: apiKey,
    } = process.env

    const client = new Client()
      .setEndpoint(endpoint!)
      .setProject(projectId!)
      .setKey(apiKey!)

    const users = new Users(client)

    const user = await users.get(id)
    const author: Author = {
      $id: user.$id,
      name: user.name,
      email: user.email,
    }

    return c.json({ data: author })
  })
  .patch(
    '/:id',
    sessionMiddleware,
    zValidator('json', updatePostSchema),
    async (c) => {
      const id = c.req.param('id')
      const { title, preDescription, fullDescription } = c.req.valid('json')

      const {
        NEXT_PUBLIC_APPWRITE_DB: dbId,
        NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION: postsId,
      } = process.env

      const databases = c.get('databases')

      const postToUpdate = await databases.getDocument(dbId!, postsId!, id)

      if (!postToUpdate) {
        return c.json({ message: 'Post not found' }, 404)
      }

      if (postToUpdate.userId !== c.get('user').$id) {
        return c.json({ message: 'Unauthorized' }, 403)
      }

      const post = await databases.updateDocument(dbId!, postsId!, id, {
        title,
        preDescription,
        fullDescription,
      })

      return c.json({ data: post })
    },
  )
