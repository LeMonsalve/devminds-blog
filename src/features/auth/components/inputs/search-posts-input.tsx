'use client'

import React from 'react'
import { Input } from '@/components/ui/input'

export function SearchPostsInput() {
  return (
    <form
      className="flex-1 sm:flex-initial"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        type="search"
        placeholder="Search Posts..."
        className="w-full sm:w-[300px] md:w-[200px] lg:w-[300px]"
      />
    </form>
  )
}
