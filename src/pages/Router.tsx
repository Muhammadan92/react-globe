import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import NotFoundPage from 'pages/NotFound/NotFound';
import HomePage from './HomePage/HomePage';
import ContactDetails from './ContactDetails/ContactDetails';
import ContactsPage from './ContactsPage/ContactsPage';
import IssueDetails from './IssueDetailsPage/IssueDetails';
import LoadingPage from './LoadingPage/LoadingPage';

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
        path: '/issues',
        element: <LoadingPage />,
      },
      {
        path: '/issues/:id',
        element: <IssueDetails />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
