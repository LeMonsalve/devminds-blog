'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ListRestartIcon } from 'lucide-react'
import { useGetPosts } from '../../api/use-get-posts'
import { PostCard } from '../cards/post-card'

type Props = {
  userId: string | undefined | null
}

export function PostsFeed({ userId }: Props) {
  const postsQuery = useGetPosts()
  const posts = postsQuery.data || []

  if (postsQuery.isError) return <PostsFeedError />
  if (postsQuery.isLoading) return <PostsFeedSkeleton />

  return posts.map((post) => (
    <PostCard
      key={post.$id}
      post={post}
      byMe={userId ? userId === post.userId : false}
    />
  ))
}

function PostsFeedSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="h-[12.8rem] w-full" />
      <Skeleton className="h-[12.8rem] w-full" />
      <Skeleton className="h-[12.8rem] w-full" />
      <Skeleton className="h-[12.8rem] w-full" />
      <Skeleton className="h-[12.8rem] w-full" />
    </div>
  )
}

function PostsFeedError() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>There is an unexpected error</CardDescription>
      </CardHeader>
      <CardDescription>
        Please try again later or contact support
      </CardDescription>
      <CardFooter>
        <Button>
          <ListRestartIcon className="mr-2 size-4" /> Reload Page
        </Button>
      </CardFooter>
    </Card>
  )
}
