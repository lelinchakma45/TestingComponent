import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import SignUpForm from '../pages/SignUp';
import Chat from '../pages/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/signup', element: <SignUpForm /> },
      { path: '/main', element: <Chat /> },
    ],
  },
]);

export default router;