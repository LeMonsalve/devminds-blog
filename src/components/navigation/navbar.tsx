import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { NavbarSearch } from './navbar-search'
import { getCurrent } from '@/features/auth/queries'
import { NavbarMenuSheet } from './navbar-menu-sheet'

export async function Navbar() {
  const user = await getCurrent()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">DevMinds</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/about">About</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <NavbarMenuSheet />
        <div className="flex items-center justify-end flex-1 space-x-2 sm:space-x-4">
          <NavbarSearch />
          {user ? (
            <Link href="/my-posts?create=true">
              <Button>Create Post</Button>
            </Link>
          ) : (
            <Link href="/auth/sign-in">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
