import { MyPostsNavbar } from '@/components/navigation'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'DevMinds - My Posts',
}

type Props = {
  children: ReactNode
}

export default function MyPostsLayout({ children }: Props) {
  return (
    <main>
      <MyPostsNavbar />
      {children}
    </main>
  )
}
