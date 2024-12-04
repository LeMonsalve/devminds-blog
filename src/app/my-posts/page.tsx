'use client'

import { MyPostsParamsVerifier } from '@/components/my-posts-params-verfier'
import { Suspense } from 'react'

export default function MyPostsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense>
        <MyPostsParamsVerifier />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </div>
  )
}
