import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../api'
import type { TBorrow } from '../../@Types/borrow.type'

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Borrow'],
  endpoints: (build) => ({
    borrowBooks: build.mutation({
      query: (borrowData: TBorrow) => ({
        url: `/borrow`,
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow'],
    }),
    borrowSummery: build.query<unknown, void>({
      query: () => ({
        url: `/borrow/borrow-summary`,
      }),
      providesTags: ['Borrow'],
    }),
  }),
})

export const { useBorrowBooksMutation, useBorrowSummeryQuery } = borrowApi
