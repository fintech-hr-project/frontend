import { Search } from 'lucide-react';
import type { EmployeeStatus } from '../../types/employee';

interface SearchFiltersProps {
  search: string;
  status: string;
  role: string;
  roles: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

function SearchFilters({
  search,
  status,
  role,
  roles,
  onSearchChange,
  onStatusChange,
  onRoleChange,
}: SearchFiltersProps) {
  return (
    <div className="search-filters">
      <label className="search-box">
        <span className="sr-only">Buscar candidatos</span>
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nome, cargo ou e-mail"
        />
      </label>

      <label className="select-box">
        <span className="sr-only">Filtrar por status</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="">Todos os status</option>
          <option value={'IN_ANALYSIS' satisfies EmployeeStatus}>Em análise</option>
          <option value={'APPROVED' satisfies EmployeeStatus}>Aprovados</option>
          <option value={'REJECTED' satisfies EmployeeStatus}>Reprovados</option>
          <option value={'HIRED' satisfies EmployeeStatus}>Contratados</option>
        </select>
      </label>

      <label className="select-box">
        <span className="sr-only">Filtrar por cargo</span>
        <select value={role} onChange={(event) => onRoleChange(event.target.value)}>
          <option value="">Todos os cargos</option>
          {roles.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SearchFilters;
