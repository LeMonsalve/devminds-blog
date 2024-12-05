'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ShareIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Post } from '../../types'

type Props = {
  post: Post
} & ButtonProps

export function SharePostButton({
  post,
  className,
  variant,
  size,
  ...props
}: Props) {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event)
    await share()
  }

  const share = async () => {
    const url = `${window.location.href}${post.$id}`

    try {
      await navigator.share({
        title: post.title,
        text: post.preDescription,
        url,
      })
    } catch {
      toast.error('Could not share post')
    }
  }

  return (
    <Button
      className={cn(className)}
      onClick={handleClick}
      variant={variant}
      size={size}
    >
      <ShareIcon className="mr-2 size-4" />
      Share
    </Button>
  )
}
