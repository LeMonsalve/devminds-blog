import { useNewPost } from '@/features/posts/hooks/use-new-post'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function MyPostsParamsVerifier() {
  const { onOpen } = useNewPost()
  const searchParams = useSearchParams()

  useEffect(() => {
    const create = searchParams.get('create')
    if (create === 'true') {
      onOpen()
    }
  }, [searchParams, onOpen])

  return <></>
}
