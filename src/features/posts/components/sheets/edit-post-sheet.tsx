import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Loader2 } from 'lucide-react'
import { useEditPost } from '../../api/use-edit-post'
import { useGetPost } from '../../api/use-get-post'
import { useOpenPost } from '../../hooks/use-open-post'
import { UpdatePostSchema } from '../../types'
import { PostForm } from '../forms/post-form'

export function EditPostSheet() {
  const { id, isOpen, onClose } = useOpenPost()
  const postQuery = useGetPost(id)
  const editMutation = useEditPost()

  const isPending = editMutation.isPending || postQuery.isPending
  const isLoading = postQuery.isLoading

  const onSubmit = (values: UpdatePostSchema) => {
    if (id === undefined) return

    editMutation.mutate(
      { json: values, param: { id } },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Post</SheetTitle>
          <SheetDescription>Edit your post details below.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <PostForm
            id={id}
            onSubmit={onSubmit}
            disabled={isLoading || isPending}
            defaultValues={postQuery.data}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
