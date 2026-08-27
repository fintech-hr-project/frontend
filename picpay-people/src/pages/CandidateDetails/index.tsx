import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Mail,
  MapPin,
  Phone,
  WalletCards,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingState from '../../components/LoadingState';
import StatusBadge from '../../components/StatusBadge';
import { getEmployeeById } from '../../services/employeeService';
import type { Employee } from '../../types/employee';

interface LocationState {
  success?: string;
}

function CandidateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEmployee = useCallback(async () => {
    if (!id) {
      setError('ID do candidato não informado.');
      setLoading(false);
      return;
    }

    const parsedId = Number(id);
    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      setError('ID do candidato inválido.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setEmployee(await getEmployeeById(parsedId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadEmployee();
  }, [loadEmployee]);

  if (loading) return <LoadingState label="Carregando candidato..." />;

  if (error || !employee) {
    return (
      <div className="page-container">
        <FeedbackMessage type="error">{error || 'Candidato não encontrado.'}</FeedbackMessage>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate('/candidates')}
        >
          Voltar para candidatos
        </button>
      </div>
    );
  }

  const success = (location.state as LocationState | null)?.success;

  return (
    <div className="page-container narrow-page">
      <button type="button" className="back-link" onClick={() => navigate('/candidates')}>
        <ArrowLeft size={17} aria-hidden="true" /> Voltar para candidatos
      </button>

      {success && <FeedbackMessage type="success">{success}</FeedbackMessage>}

      <header className="candidate-detail-header">
        <div className="candidate-detail-identity">
          <span className="candidate-avatar candidate-avatar-large" aria-hidden="true">
            {employee.name
              .split(' ')
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
              .toUpperCase()}
          </span>
          <div>
            <div className="candidate-name-row">
              <h1>{employee.name}</h1>
              <StatusBadge status={employee.status} />
            </div>
            <p>{employee.role} • {employee.department || 'Sem departamento'}</p>
          </div>
        </div>
      </header>

      <section className="content-card details-card">
        <h2>Informações do candidato</h2>
        <div className="details-grid">
          <div className="detail-group">
            <h3>Dados pessoais</h3>
            <div className="detail-item"><Mail size={18} /><div><span>E-mail</span><strong>{employee.email}</strong></div></div>
            <div className="detail-item"><Phone size={18} /><div><span>Telefone</span><strong>{employee.phone || 'Não informado'}</strong></div></div>
            <div className="detail-item"><MapPin size={18} /><div><span>Cidade</span><strong>{employee.city || 'Não informada'}</strong></div></div>
          </div>
          <div className="detail-group">
            <h3>Vaga e contratação</h3>
            <div className="detail-item"><BriefcaseBusiness size={18} /><div><span>Cargo</span><strong>{employee.role}</strong></div></div>
            <div className="detail-item"><Building2 size={18} /><div><span>Departamento</span><strong>{employee.department || 'Não informado'}</strong></div></div>
            <div className="detail-item"><WalletCards size={18} /><div><span>Salário</span><strong>{employee.salary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></div></div>
          </div>
        </div>
        <div className="details-meta">ID {employee.id}</div>
      </section>
    </div>
  );
}

export default CandidateDetails;
