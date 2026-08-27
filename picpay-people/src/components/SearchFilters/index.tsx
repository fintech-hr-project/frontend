import { Search } from 'lucide-react';
import type { StatusFuncionario } from '../../types/funcionario';

interface SearchFiltersProps {
  search: string;
  status: string;
  cargo: string;
  cargos: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCargoChange: (value: string) => void;
}

function SearchFilters({
  search,
  status,
  cargo,
  cargos,
  onSearchChange,
  onStatusChange,
  onCargoChange,
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
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">Todos os status</option>
          <option value={'EM_ANALISE' satisfies StatusFuncionario}>Em análise</option>
          <option value={'APROVADO' satisfies StatusFuncionario}>Aprovados</option>
          <option value={'REPROVADO' satisfies StatusFuncionario}>Reprovados</option>
          <option value={'CONTRATADO' satisfies StatusFuncionario}>Contratados</option>
        </select>
      </label>

      <label className="select-box">
        <span className="sr-only">Filtrar por cargo</span>
        <select
          value={cargo}
          onChange={(event) => onCargoChange(event.target.value)}
        >
          <option value="">Todos os cargos</option>
          {cargos.map((item) => (
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
