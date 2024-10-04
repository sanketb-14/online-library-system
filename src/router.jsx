import { createBrowserRouter } from 'react-router-dom';
import  Layout  from './components/Layout';
import  HomePage  from './pages/HomePage';
import BrowseBooksPage  from './pages/BrowseBookPage';
import  BookDetailsPage  from './pages/BookDetailsPage';
import  AddBookPage  from './pages/AddBookPage';
import  NotFoundPage  from './pages/NotFoundPage';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'books', element: <BrowseBooksPage /> },
        { path: 'books/:category', element: <BrowseBooksPage /> },
        { path: 'book/:id', element: <BookDetailsPage /> },
        { path: 'add-book', element: <AddBookPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);

  export default router;