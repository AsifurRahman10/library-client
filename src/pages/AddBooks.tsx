import { useState } from 'react'
import { useCreateBookMutation } from '../redux/books/bookApi'

export const AddBooks = () => {
  const [page, setPage] = useState(0)
  const { data, isLoading, isFetching } = useCreateBookMutation({})
  return <div>AddBooks</div>
}
