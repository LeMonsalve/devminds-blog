import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { authApp } from '@/features/auth/server/route'
import { postsApp } from '@/features/posts/server/route'

const app = new Hono().basePath('/api')

const routes = app.route('/auth', authApp).route('/posts', postsApp)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes
