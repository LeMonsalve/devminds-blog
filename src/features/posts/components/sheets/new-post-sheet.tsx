import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCreatePost } from '@/features/posts/api'
import { useNewPost } from '@/features/posts/hooks/use-new-post'
import { chooseRandom } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { postExamples } from '../../data'
import { CreatePostSchema } from '../../types'
import { PostForm } from '../forms/post-form'

export function NewPostSheet() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
  const defaultValues = isDevelopment ? chooseRandom(postExamples) : undefined

  const { isOpen, onClose } = useNewPost()
  const mutation = useCreatePost()

  const onSubmit = (values: CreatePostSchema) => {
    mutation.mutate(
      { json: values },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  const handleOpenChange = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('create')
    router.replace(`${pathname}?${params.toString()}`)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Post</SheetTitle>
          <SheetDescription>
            Create a new post to share with community.
          </SheetDescription>
        </SheetHeader>
        <PostForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={defaultValues}
        />
      </SheetContent>
    </Sheet>
  )
}
