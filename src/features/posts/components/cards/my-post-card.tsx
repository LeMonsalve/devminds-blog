import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FaEdit } from 'react-icons/fa'

interface Post {
  $id: string
  title: string
  preDescription: string
}

interface MyPostCardProps {
  post: Post
  onEdit?: (postId: string) => void
}

export function MyPostCard({ post, onEdit }: MyPostCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg hover:bg-accent/20 transition-all relative group">
      <div
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onEdit?.(post.$id)}
      >
        <FaEdit
          className="text-gray-300 hover:text-white cursor-pointer"
          size={20}
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardDescription className="line-clamp-3 px-6 pb-6">
        {post.preDescription}
      </CardDescription>
    </Card>
  )
}
