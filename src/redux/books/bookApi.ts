import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../api'
import type { TBooks } from '../../@Types/book.type'

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Books'],
  endpoints: (build) => ({
    getBooks: build.query({
      query: ({ page, limit }) => ({
        url: '/book',
        params: { page, limit },
      }),
      providesTags: ['Books'],
    }),
    getBookById: build.query({
      query: ({ id }) => ({
        url: `/book/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Books', id: arg.id }],
    }),
    createBook: build.mutation({
      query: (bookData: TBooks) => ({
        url: `/book`,
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: build.mutation({
      query: ({ id, bookData }) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: bookData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Books', id: arg.id },
        'Books',
      ],
    }),
    deleteBook: build.mutation({
      query: (id) => ({
        url: `/book${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
})

export const {
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useGetBooksQuery,
  useUpdateBookMutation,
} = bookApi
