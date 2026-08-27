import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import CreateEmployee from '../pages/CreateEmployee';
import Dashboard from '../pages/Dashboard';
import EditEmployee from '../pages/EditEmployee';
import EmployeeDetails from '../pages/EmployeeDetails';
import Employees from '../pages/Employees';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/employees', element: <Employees /> },
      { path: '/employees/new', element: <CreateEmployee /> },
      { path: '/employees/:id', element: <EmployeeDetails /> },
      { path: '/employees/:id/edit', element: <EditEmployee /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
