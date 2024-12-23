'use client'

import { MyPostsParamsVerifier } from '@/components/my-posts-params-verfier'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMyPosts } from '@/features/posts/api/use-get-my-posts'
import { MyPostCard } from '@/features/posts/components/cards/my-post-card'
import UserCard, {
  UserCardSkeleton,
} from '@/features/posts/components/cards/user-card'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { useOpenPost } from '../../hooks/use-open-post'

export default function MyPostsFeed() {
  const postsQuery = useGetMyPosts()
  const { onOpen } = useOpenPost()
  const posts = postsQuery.data || []

  const handleEditPost = (id: string) => {
    onOpen(id)
  }

  if (postsQuery.isError) return redirect('/')
  if (postsQuery.isLoading) return <PostsFeedSkeleton />

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense>
        <MyPostsParamsVerifier />
      </Suspense>
      <div className="mb-8">
        <UserCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <MyPostCard key={post.$id} post={post} onEdit={handleEditPost} />
        ))}
      </div>
    </div>
  )
}

function PostsFeedSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <UserCardSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="p-4 relative group">
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-8" />
            </CardHeader>
            <CardDescription className="line-clamp-3 px-6 pb-6">
              <Skeleton className="h-16" />
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  )
}
