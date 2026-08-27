import { MoreHorizontal, Pencil, Trash2, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Funcionario } from '../../types/funcionario';
import StatusBadge from '../StatusBadge';

interface CandidateTableProps {
  funcionarios: Funcionario[];
  onDelete: (funcionario: Funcionario) => void;
}

function CandidateTable({ funcionarios, onDelete }: CandidateTableProps) {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  if (funcionarios.length === 0) {
    return (
      <div className="empty-state" role="status">
        <UserRound size={36} aria-hidden="true" />
        <strong>Nenhum candidato encontrado</strong>
        <span>Tente ajustar a busca ou os filtros.</span>
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
            <th scope="col" className="actions-column">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>
                <button
                  type="button"
                  className="candidate-identity-button"
                  onClick={() => navigate(`/candidatos/${funcionario.id}`)}
                >
                  <span className="candidate-avatar" aria-hidden="true">
                    {funcionario.nome
                      .split(' ')
                      .slice(0, 2)
                      .map((parte) => parte[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                  <span className="candidate-identity-text">
                    <strong>{funcionario.nome}</strong>
                    <small>{funcionario.email}</small>
                  </span>
                </button>
              </td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.cidade || '—'}</td>
              <td>
                <StatusBadge status={funcionario.status} />
              </td>
              <td>
                {funcionario.salario.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td className="actions-cell">
                <div className="row-menu-wrapper">
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Abrir ações de ${funcionario.nome}`}
                    aria-haspopup="menu"
                    aria-expanded={openMenuId === funcionario.id}
                    onClick={() =>
                      setOpenMenuId((current) =>
                        current === funcionario.id ? null : funcionario.id,
                      )
                    }
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenuId === funcionario.id && (
                    <div className="row-menu" role="menu">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() =>
                          navigate(`/candidatos/${funcionario.id}`)
                        }
                      >
                        <UserRound size={16} aria-hidden="true" />
                        Ver detalhes
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() =>
                          navigate(`/candidatos/${funcionario.id}/editar`)
                        }
                      >
                        <Pencil size={16} aria-hidden="true" />
                        Editar
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        className="danger-menu-item"
                        onClick={() => {
                          setOpenMenuId(null);
                          onDelete(funcionario);
                        }}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateTable;
