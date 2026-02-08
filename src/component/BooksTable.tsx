/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

export const BooksTable = ({ books, setSelectedId, setModalOpen }: any) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
            {/* <TableHead>Status</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {books?.map((book: any) => (
            <TableRow key={book._id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.available ? (
                  <span className="text-green-600 font-semibold">
                    Available
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Out</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSelectedId(book._id)
                    setModalOpen(true)
                  }}
                  variant="outline"
                  size="sm"
                >
                  Edit Books
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
