import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import CandidateDetails from '../pages/CandidateDetails';
import Candidates from '../pages/Candidates';
import Dashboard from '../pages/Dashboard';
import EditCandidate from '../pages/EditCandidate';
import NewCandidate from '../pages/NewCandidate';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/candidatos', element: <Candidates /> },
      { path: '/candidatos/novo', element: <NewCandidate /> },
      { path: '/candidatos/:id', element: <CandidateDetails /> },
      { path: '/candidatos/:id/editar', element: <EditCandidate /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
