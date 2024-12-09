import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chooseRandom } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { postExamples } from '../../data'
import { postFormSchema } from '../../schemas'
import { PostFormSchema } from '../../types'

type Props = {
  onSubmit: (values: PostFormSchema) => void
  defaultValues?: PostFormSchema
  disabled?: boolean
  id?: string
}

const example = chooseRandom<PostFormSchema>(postExamples)

export function PostForm({ onSubmit, defaultValues, disabled, id }: Props) {
  const form = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      preDescription: defaultValues?.preDescription || '',
      fullDescription: defaultValues?.fullDescription || '',
    },
  })

  const handleSubmit = (values: PostFormSchema) => {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder={example.title}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="preDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pre Description</FormLabel>
              <FormControl>
                <Textarea
                  maxLength={200}
                  className="h-24 resize-none"
                  disabled={disabled}
                  placeholder={example.preDescription}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="fullDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea
                  maxLength={6000}
                  className="h-96 resize-none"
                  disabled={disabled}
                  placeholder={example.fullDescription}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </Form>
  )
}
