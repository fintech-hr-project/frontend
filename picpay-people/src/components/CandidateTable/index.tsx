import { Eye, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Employee } from '../../types/employee';
import StatusBadge from '../StatusBadge';

interface CandidateTableProps {
  employees: Employee[];
}

function CandidateTable({ employees }: CandidateTableProps) {
  const navigate = useNavigate();

  if (employees.length === 0) {
    return (
      <div className="empty-state" role="status">
        <UserRound size={30} aria-hidden="true" />
        <strong>Nenhum candidato encontrado</strong>
        <span>Tente alterar a busca ou os filtros.</span>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="candidate-table">
        <thead>
          <tr>
            <th scope="col">Candidato</th>
            <th scope="col">Cargo</th>
            <th scope="col">Cidade</th>
            <th scope="col">Status</th>
            <th scope="col">Salário</th>
            <th scope="col"><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <button
                  type="button"
                  className="candidate-cell-button"
                  onClick={() => navigate(`/candidates/${employee.id}`)}
                >
                  <span className="candidate-avatar" aria-hidden="true">
                    {employee.name
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                  <span className="candidate-cell-text">
                    <strong>{employee.name}</strong>
                    <small>{employee.email}</small>
                  </span>
                </button>
              </td>
              <td>{employee.role}</td>
              <td>{employee.city || '—'}</td>
              <td><StatusBadge status={employee.status} /></td>
              <td>
                {employee.salary.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Ver detalhes de ${employee.name}`}
                  title="Ver detalhes"
                  onClick={() => navigate(`/candidates/${employee.id}`)}
                >
                  <Eye size={18} aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateTable;
