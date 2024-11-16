import { hc } from 'hono/client'
import { AppType } from '@/app/api/[[...route]]/route'

const { NEXT_PUBLIC_API_URL: apiUrl } = process.env

export const client = hc<AppType>(apiUrl!)
