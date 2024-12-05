'use server'

import { client } from '@/lib/rpc'
import { Client, Databases, Query } from 'node-appwrite'
import { mapToPost } from './mappers'
import { Author, Post } from './types'

export async function getPost(id: string): Promise<Post | null> {
  try {
    const {
      NEXT_PUBLIC_APPWRITE_ENDPOINT: endpoint,
      NEXT_PUBLIC_APPWRITE_PROJECT: project,
      NEXT_PUBLIC_APPWRITE_DB: dbId,
      NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION: postsId,
    } = process.env

    const client = new Client().setEndpoint(endpoint!).setProject(project!)
    const databases = new Databases(client)

    const postList = await databases.listDocuments(dbId!, postsId!, [
      Query.equal('$id', id),
    ])

    return mapToPost(postList.documents[0])
  } catch {
    return null
  }
}

export async function getAuthor(id: string): Promise<Author | null> {
  try {
    const response = await client.api.posts.author[':id'].$get({
      param: { id },
    })

    if (!response.ok) return null

    const { data } = await response.json()
    return data
  } catch {
    return null
  }
}
