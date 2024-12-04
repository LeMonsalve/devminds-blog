'use client'

import { useNewPost } from '@/features/posts/hooks/use-new-post'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MyPostsPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const { onOpen } = useNewPost()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoaded(true)
    if (isLoaded) {
      const create = searchParams.get('create')
      if (create === 'true') {
        onOpen()
      }
    }
  }, [searchParams, onOpen, isLoaded])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-6"></div>
    </div>
  )
}
