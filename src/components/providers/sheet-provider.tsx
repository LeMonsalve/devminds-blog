'use client'

import { EditPostSheet, NewPostSheet } from '@/features/posts/components/sheets'
import { useEffect, useState } from 'react'

export function SheetProvider() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <>
      <NewPostSheet />
      <EditPostSheet />
    </>
  )
}
