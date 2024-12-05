import { getCurrent } from '@/features/auth/queries'
import { PostsFeed } from '@/features/posts/components/grids/posts-feed'

export default async function Home() {
  const user = await getCurrent()

  return (
    <div className="space-y-6">
      <PostsFeed userId={user?.$id} />
    </div>
  )
}
