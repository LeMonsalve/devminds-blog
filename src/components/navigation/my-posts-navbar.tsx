import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getCurrent } from '@/features/auth/queries'
import { HomeIcon } from 'lucide-react'

export async function MyPostsNavbar() {
  const user = await getCurrent()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
            <Button variant="secondary">
              <HomeIcon />
              Go home
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-end flex-1 space-x-2 sm:space-x-4">
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
