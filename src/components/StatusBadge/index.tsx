import type { EmployeeStatus } from '../../types/employee';

interface StatusBadgeProps {
  status: EmployeeStatus;
}

const labels: Record<EmployeeStatus, string> = {
  IN_ANALYSIS: 'Em análise',
  APPROVED: 'Aprovado',
  REJECTED: 'Reprovado',
  HIRED: 'Contratado',
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
