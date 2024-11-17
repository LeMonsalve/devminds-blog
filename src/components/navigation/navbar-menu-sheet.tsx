'use client'

import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '../ui/sheet'
import Link from 'next/link'

export function NavbarMenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetTitle>
          <span className="font-bold">DevMinds</span>
        </SheetTitle>
        <nav className="flex flex-col gap-4 mt-4">
          <Link href="/about">About</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
