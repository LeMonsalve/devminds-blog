import { LogOut, ThumbsUp, MessageCircle, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getCurrent } from '@/features/auth/queries'
import { UserButton } from '@/features/auth/components'

const posts = [
  {
    id: 1,
    title: 'Introduction to React Hooks',
    author: 'Jane Smith',
    likes: 42,
    comments: 15,
  },
  {
    id: 2,
    title: 'Building Scalable APIs with Node.js',
    author: 'Bob Johnson',
    likes: 38,
    comments: 22,
  },
  {
    id: 3,
    title: 'CSS Grid Layout: A Comprehensive Guide',
    author: 'Alice Brown',
    likes: 56,
    comments: 30,
  },
]

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
export default async function Home() {
  const user = await getCurrent()

  return (
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

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">By {post.author}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

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
  )
}
