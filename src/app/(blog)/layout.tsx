import { Navbar } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserButton } from '@/features/auth/components'
import { getCurrent } from '@/features/auth/queries'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const popularTopics = [
  'React',
  'Node.js',
  'TypeScript',
  'Next.js',
  'TailwindCSS',
  'GraphQL',
  'Docker',
  'AWS',
  'Hono',
  'AppWrite',
]

export default async function BlogLayout({ children }: Props) {
  const user = await getCurrent()

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-6">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  {user ? (
                    <>
                      <UserButton align="center" />
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                    </>
                  ) : (
                    <>
                      <Avatar>
                        <AvatarFallback>
                          <LogOut className="h-8 w-8" />
                        </AvatarFallback>
                        <AvatarImage src="/avatar.jpg" alt="User avatar" />
                      </Avatar>
                      <h2 className="text-2xl font-bold">Guest User</h2>
                      <p className="text-muted-foreground">
                        You are not logged in
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {children}

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
