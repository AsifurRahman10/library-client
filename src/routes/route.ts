import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { AllBooks } from '../pages/AllBooks'
import { BorrowSummery } from '../pages/BorrowSummery'
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/books',
        Component: AllBooks,
      },
      // {
      //   path: '/add-book',
      //   Component: AddBooks,
      // },
      {
        path: '/borrow-summery',
        Component: BorrowSummery,
      },
    ],
  },
])

export default router
