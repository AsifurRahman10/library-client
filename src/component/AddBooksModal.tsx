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
import {
  useCreateBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '../redux/books/bookApi'
import { useEffect } from 'react'

type ModalProps = {
  open: boolean
  setModalOpen: (value: boolean) => void
  selectedId?: string | null
}

const schema = z.object({
  title: z.string().min(2),
  author: z.string().min(2),
  genre: z.string().min(2),
  isbn: z.string().min(3),
  description: z.string().min(5),
  copies: z.number().min(0),
  available: z.boolean(),
})

type BookFormValues = z.infer<typeof schema>

export const AddBooksModal = ({
  open,
  setModalOpen,
  selectedId,
}: ModalProps) => {
  const isEdit = !!selectedId

  const form = useForm<BookFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      isbn: '',
      description: '',
      copies: 1,
      available: true,
    },
  })

  // ✅ correct param shape + conditional fetch
  const { data: bookData, isLoading } = useGetBookByIdQuery(
    { id: selectedId! },
    { skip: !selectedId }
  )
  const data = bookData?.data

  const [createBook] = useCreateBookMutation()
  const [updateBook] = useUpdateBookMutation()

  // ✅ Prefill form when editing
  useEffect(() => {
    if (data && isEdit) {
      form.reset({
        title: data.title,
        author: data.author,
        genre: data.genre,
        isbn: data.isbn,
        description: data.description,
        copies: data.copies,
        available: data.available,
      })
    }
  }, [data, isEdit, form])

  // ✅ Submit create OR update
  const submit = async (values: BookFormValues) => {
    if (isEdit && selectedId) {
      await updateBook({ id: selectedId, bookData: values })
    } else {
      await createBook(values)
    }

    setModalOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        </DialogHeader>

        {isEdit && isLoading ? (
          <p>Loading book...</p>
        ) : (
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input {...field} />
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

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>

                <Button type="submit">
                  {isEdit ? 'Update Book' : 'Save Book'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
