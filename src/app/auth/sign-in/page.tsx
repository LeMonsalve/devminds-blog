import { SignInCard } from '@/features/auth/components'
import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const user = await getCurrent()
  if (user) redirect('/')

  const {
    NODE_ENV: env,
    DEFAULT_USER_EMAIL: email,
    DEFAULT_USER_PASSWORD: password,
  } = process.env

  if (env === 'development' && email && password) {
    return <SignInCard defaultValues={{ email, password }} />
  }

  return <SignInCard />
}
