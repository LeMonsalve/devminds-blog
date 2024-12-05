import { Models } from 'node-appwrite'
import { Post } from './types'

export function mapToPost(data: Models.Document): Post {
  return {
    $id: data.$id,
    title: data.title,
    preDescription: data.preDescription,
    fullDescription: data.fullDescription,
    userId: data.userId,
  }
}

export function mapToPosts(data: Models.Document[]): Post[] {
  return data.map((post) => mapToPost(post))
}
