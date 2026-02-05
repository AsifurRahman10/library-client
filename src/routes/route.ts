import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { AllBooks } from '../pages/AllBooks'
import { AddBooks } from '../pages/AddBooks'
import { BorrowSummery } from '../pages/BorrowSummery'
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/all-books',
        Component: AllBooks,
      },
      {
        path: '/add-book',
        Component: AddBooks,
      },
      {
        path: '/borrow-summery',
        Component: BorrowSummery,
      },
    ],
  },
])

export default router
