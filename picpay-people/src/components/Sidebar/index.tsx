import { ChevronRight, House, UserPlus, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand" aria-label="PicPay People">
        <div className="sidebar-brand-text">
          <strong>PicPay</strong>
          <span>People</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegação principal">
        <span className="sidebar-section-title">MENU</span>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
          }
        >
          <House size={19} aria-hidden="true" />
          <span>Visão geral</span>
        </NavLink>

        <NavLink
          to="/candidatos"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
          }
        >
          <Users size={19} aria-hidden="true" />
          <span>Candidatos</span>
        </NavLink>

        <NavLink
          to="/candidatos/novo"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
          }
        >
          <UserPlus size={19} aria-hidden="true" />
          <span>Novo candidato</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user" aria-label="Equipe de RH, Recrutamento">
          <div className="sidebar-user-avatar" aria-hidden="true">
            RH
          </div>
          <div className="sidebar-user-info">
            <strong>Equipe de RH</strong>
            <span>Recrutamento</span>
          </div>
          <ChevronRight size={18} aria-hidden="true" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
