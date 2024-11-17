import { hc } from 'hono/client'
import { AppType } from '@/app/api/[[...route]]/route'

export const client = hc<AppType>('https://devminds-blog.vercel.app')
