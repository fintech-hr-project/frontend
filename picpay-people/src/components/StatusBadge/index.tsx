import type { StatusFuncionario } from '../../types/funcionario';

interface StatusBadgeProps {
  status: StatusFuncionario;
}

const labels: Record<StatusFuncionario, string> = {
  EM_ANALISE: 'Em análise',
  APROVADO: 'Aprovado',
  REPROVADO: 'Reprovado',
  CONTRATADO: 'Contratado',
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      <span className="status-dot" aria-hidden="true" />
      {labels[status]}
    </span>
  );
}

export default StatusBadge;
