import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import CandidateDetails from '../pages/CandidateDetails';
import Candidates from '../pages/Candidates';
import Dashboard from '../pages/Dashboard';
import NewCandidate from '../pages/NewCandidate';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/candidates', element: <Candidates /> },
      { path: '/candidates/new', element: <NewCandidate /> },
      { path: '/candidates/:id', element: <CandidateDetails /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
