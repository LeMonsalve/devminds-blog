import { SignUpCard } from '@/features/auth/components/cards/sign-up-card'
import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  const user = await getCurrent()
  if (user) redirect('/')

  return <SignUpCard />
}
