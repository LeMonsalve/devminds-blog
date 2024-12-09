import { AUTH_COOKIE } from '@/features/auth/constants'
import { loginSchema, registerSchema } from '@/features/auth/schemas'
import { createAdminClient } from '@/lib/appwrite'
import { sessionMiddleware } from '@/lib/session-middleware'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { ID } from 'node-appwrite'

export const authApp = new Hono()
  .get('/current', sessionMiddleware, async (c) => {
    const user = c.get('user')

    return c.json({ data: user })
  })
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json')

    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })

    return c.json({ email, password })
  })
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { name, email, password } = c.req.valid('json')

    const { account } = await createAdminClient()
    const user = await account.create(ID.unique(), email, password, name)

    const session = await account.createEmailPasswordSession(email, password)
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })

    return c.json({ data: user })
  })
  .post('/logout', sessionMiddleware, async (c) => {
    const account = c.get('account')

    deleteCookie(c, AUTH_COOKIE)
    await account.deleteSession('current')

    return c.json({ success: true })
  })
