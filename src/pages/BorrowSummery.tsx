import { useBorrowSummeryQuery } from '../redux/borrow/borrowApi'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

export const BorrowSummery = () => {
  const { data, isLoading, isError } = useBorrowSummeryQuery()

  if (isLoading) {
    return <div className="p-6">Loading borrow summary...</div>
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to load summary</div>
  }

  const rows = data?.data ?? []

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Borrow Summary</h2>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead className="text-right">Total Borrowed</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No borrow records found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row: any, index: number) => (
                <TableRow key={row.isbn}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell>{row.isbn}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {row.totalBorrowedQuantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
