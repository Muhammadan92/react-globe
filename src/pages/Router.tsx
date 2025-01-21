import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import NotFoundPage from 'pages/NotFound/NotFound';
import HomePage from './HomePage/HomePage';
import ContactDetails from './ContactsPage/ContactDetails';
import ContactsPage from './ContactsPage/ContactsPage';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/contacts',
        element: <ContactsPage />,
      },
      {
        path: '/contacts/:id',
        element: <ContactDetails />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
