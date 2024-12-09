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
import ReactMarkdown from 'react-markdown'

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
        <ReactMarkdown
          className="prose dark:prose-invert"
          components={reactReadmeStyles}
        >
          {post.fullDescription}
        </ReactMarkdown>
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

const reactReadmeStyles = {
  p: ({ ...props }) => <p className="mb-4 text-foreground" {...props} />,
  h1: ({ ...props }) => (
    <h1
      className="text-3xl font-bold text-foreground mb-6 pb-2 border-b border-border"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className="text-2xl font-semibold text-foreground mb-4 mt-6 pb-1 border-b border-border"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className="text-xl font-semibold text-foreground mb-3 mt-4"
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul className="list-disc list-outside pl-6 mb-4 space-y-2" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="list-decimal list-outside pl-6 mb-4 space-y-2" {...props} />
  ),
  li: ({ ...props }) => <li className="text-foreground" {...props} />,
  a: ({ ...props }) => (
    <a
      className="text-primary hover:text-primary/80 underline transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-secondary/30"
      {...props}
    />
  ),
  code: ({ ...props }) => (
    <code
      className="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: ({ ...props }) => (
    <pre
      className="bg-secondary text-secondary-foreground rounded-lg p-4 overflow-x-auto mb-4"
      {...props}
    />
  ),
  em: ({ ...props }) => <em className="italic text-foreground/80" {...props} />,
}
