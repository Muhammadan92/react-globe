import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import NotFoundPage from 'pages/NotFound/NotFound';
import HomePage from './HomePage/HomePage';

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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
