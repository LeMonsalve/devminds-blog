import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getCurrent } from '@/features/auth/queries'
import { SharePostButton } from '@/features/posts/components/buttons/share-post-button'
import { getAuthor, getPost } from '@/features/posts/queries'
import { postIdSchema } from '@/features/posts/schemas'
import { cn } from '@/lib/utils'
import { VerifiedIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params
  const isValidId = postIdSchema.safeParse(id).success
  if (!isValidId) return redirect('/')

  const post = await getPost(id)
  if (!post) return redirect('/')

  const author = await getAuthor(post.userId)
  if (!author) return redirect('/')

  const user = await getCurrent()

  const authorName = user?.$id === author.$id ? 'You' : author.name
  const isVerified = author.email === 'devminds@gmail.com'

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            'text-3xl flex items-center',
            isVerified && 'text-blue-500',
          )}
        >
          {post.title}
          {isVerified && <VerifiedBadge />}
        </CardTitle>
        <CardDescription>{post.preDescription}</CardDescription>
        <div className="mr-2 space-y-3">
          <Badge
            variant={isVerified ? 'default' : 'outline'}
            className={cn('w-max', isVerified && 'bg-blue-500')}
          >
            Created by {authorName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.fullDescription}</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-x-6">
        <SharePostButton
          className="w-full"
          variant="ghost"
          size="sm"
          post={post}
        />
      </CardFooter>
    </Card>
  )
}

function VerifiedBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <VerifiedIcon className="ml-2 size-8  inline-block cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>This post is official by DevMinds</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
