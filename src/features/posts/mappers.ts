import { Models } from 'node-appwrite'
import { Post } from './types'

export function mapToPost(data: Models.Document): Post {
  const { $id, title, preDescription, fullDescription, userId } = data
  return {
    $id,
    title,
    preDescription,
    fullDescription,
    userId,
  }
}

export function mapToPosts(data: Models.Document[]): Post[] {
  return data.map((post) => mapToPost(post))
}
