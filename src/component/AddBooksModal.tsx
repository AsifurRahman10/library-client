import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { Button } from '../components/ui/button'
import { useCreateBookMutation } from '../redux/books/bookApi'

type ModalProps = {
  open: boolean
  setModalOpen: (value: boolean) => void
}

const schema = z.object({
  title: z.string().min(2),
  author: z.string().min(2),
  genre: z.string().min(2),
  description: z.string().min(5),
  copies: z.number().min(0),
  available: z.boolean(),
})

type BookFormValues = z.infer<typeof schema>

export const AddBooksModal = ({ open, setModalOpen }: ModalProps) => {
  const form = useForm<BookFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      description: '',
      copies: 1,
      available: true,
    },
  })
  const [postBook] = useCreateBookMutation()

  const submit = async (data: BookFormValues) => {
    await postBook(data)

    setModalOpen(false)
    form.reset()
  }
  return (
    <Dialog open={open} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            {/* TITLE */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Atomic Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AUTHOR */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Brad Frost" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GENRE */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* COPIES */}
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AVAILABLE */}
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel>Available</FormLabel>
                </FormItem>
              )}
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Save Book</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
