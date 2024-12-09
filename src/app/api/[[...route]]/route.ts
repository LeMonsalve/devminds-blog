import { authApp } from '@/features/auth/server/route'
import { postsApp } from '@/features/posts/server/route'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

const routes = app.route('/auth', authApp).route('/posts', postsApp)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)

export type AppType = typeof routes
