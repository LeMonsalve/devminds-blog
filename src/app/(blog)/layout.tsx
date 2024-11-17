import { Navbar } from '@/components/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function BlogLayout({ children }: Props) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
