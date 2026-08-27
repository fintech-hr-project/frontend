import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

function AppLayout() {
  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>

      <Sidebar />

      <main id="main-content" className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
