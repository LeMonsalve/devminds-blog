'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export type Props = {
  children: ReactNode
}

export default function AuthLayout({ children }: Readonly<Props>) {
  const pathname = usePathname()
  const [isSignIn, setIsSignIn] = useState<boolean>(
    pathname === '/auth/sign-in',
  )

  useEffect(() => {
    setIsSignIn(pathname === '/auth/sign-in')
  }, [pathname])

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src={'/logo.svg'} alt={'DevMindss'} width={152} height={56} />
          {isSignIn ? (
            <Button asChild>
              <Link href={'/auth/sign-up'}>Sign Up</Link>
            </Button>
          ) : (
            <Button variant="secondary" asChild>
              <Link href={'/auth/sign-in'}>Sign In</Link>
            </Button>
          )}
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  )
}
