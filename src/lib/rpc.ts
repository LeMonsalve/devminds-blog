import { AppType } from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'

const appUrl = process.env.NEXT_PUBLIC_APP_URL

if (!appUrl) {
  throw new Error('NEXT_PUBLIC_APP_URL is required')
}

export const client = hc<AppType>(appUrl)
