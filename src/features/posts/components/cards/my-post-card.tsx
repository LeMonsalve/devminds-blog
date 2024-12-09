import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BookIcon, EditIcon } from 'lucide-react'
import Link from 'next/link'
import { Post } from '../../types'
import { SharePostButton } from '../buttons/share-post-button'

interface MyPostCardProps {
  post: Post
  onEdit?: (postId: string) => void
}

export function MyPostCard({ post, onEdit }: MyPostCardProps) {
  const handleEdit = () => {
    onEdit?.(post.$id)
  }

  return (
    <Card className="pt-4 px-4 hover:shadow-lg hover:bg-accent/20 transition-all relative group">
      <div
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onEdit?.(post.$id)}
      ></div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardDescription className="line-clamp-3 px-6 pb-6">
        {post.preDescription}
      </CardDescription>
      <CardFooter className="flex justify-between gap-x-6">
        <Button variant="ghost" size="sm" className="flex-1" asChild>
          <Link href={`/${post.$id}`}>
            <BookIcon className="mr-2 size-4" />
            Read Post
          </Link>
        </Button>
        <SharePostButton
          variant="ghost"
          size="sm"
          post={post}
          className="flex-1"
        />
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={handleEdit}
        >
          <EditIcon className="mr-2 size-4" />
          Edit Post
        </Button>
      </CardFooter>
    </Card>
  )
}
