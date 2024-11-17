'use client'

import { SearchPostsInput } from '@/features/auth/components'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function NavbarSearch() {
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)

  return (
    <>
      {isSearchVisible ? (
        <SearchPostsInput />
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          onClick={() => setIsSearchVisible(true)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search Posts</span>
        </Button>
      )}
    </>
  )
}
