import { useState } from 'react'
import { useGetBooksQuery } from '../redux/books/bookApi'
import { BooksTable } from '../component/BooksTable'
import { Button } from '../components/ui/button'
import { AddBooksModal } from '../component/AddBooksModal'

export const AllBooks = () => {
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const { data: booksData, isLoading, isFetching } = useGetBooksQuery({ page })
  const books = booksData?.data?.data || []
  const meta = booksData?.data?.meta
  return (
    <div className="mt-4">
      {/* AllBooks */}
      <div className="flex justify-end my-3">
        <div></div>
        <Button onClick={() => setModalOpen(true)}>Add book</Button>
      </div>
      {isFetching && isLoading && <div>Updating...</div>}
      <BooksTable books={books} />

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Page {meta?.page} of {meta?.totalPage}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={page >= meta?.totalPage || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <AddBooksModal open={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}
