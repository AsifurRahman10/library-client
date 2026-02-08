import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useBorrowBooksMutation } from '../redux/borrow/borrowApi'

const schema = z.object({
  quantity: z.number().min(1, 'Minimum 1 copy required'),
  dueDate: z.string().min(1, 'Due date required'),
})

type BorrowFormValues = z.infer<typeof schema>

export const BorrowModal = ({
  open,
  setOpen,
  bookId,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  bookId: string
}) => {
  const form = useForm<BorrowFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
      dueDate: '',
    },
  })

  const [postBorrow] = useBorrowBooksMutation()
  const submit = (data: BorrowFormValues) => {
    const payload = {
      ...data,
      bookId,
      dueDate: new Date(data.dueDate),
    }

    postBorrow?.(payload)

    // setOpen(false)
    form.reset()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            {/* QUANTITY */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === '' ? 1 : e.target.valueAsNumber
                        )
                      }
                      min={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DUE DATE */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Confirm Borrow</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
