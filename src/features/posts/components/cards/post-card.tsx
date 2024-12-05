'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BookIcon } from 'lucide-react'
import Link from 'next/link'
import { useAuthor } from '../../api/use-author'
import { Post } from '../../types'
import { SharePostButton } from '../buttons/share-post-button'

type Props = {
  post: Post
  byMe: boolean
}

export function PostCard({ post, byMe }: Props) {
  const authorQuery = useAuthor({ id: post.userId })
  const author = authorQuery.data || undefined

  const authorName = byMe ? 'You' : author?.name

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {authorQuery.isLoading ? (
          <Skeleton className="h-6 w-1/2" />
        ) : (
          <p className="text-muted-foreground">By {authorName}</p>
        )}
        <p className="line-clamp-3">{post.preDescription}</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-x-6">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href={`/${post.$id}`}>
            <BookIcon className="mr-2 size-4" />
            Read Post
          </Link>
        </Button>
        <SharePostButton
          variant="ghost"
          size="sm"
          post={post}
          className="w-full"
        />
      </CardFooter>
    </Card>
  )
}
