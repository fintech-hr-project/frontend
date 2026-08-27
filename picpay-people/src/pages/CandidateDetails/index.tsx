import { ArrowLeft, Mail, MapPin, Pencil, Phone, Trash2, WalletCards, BriefcaseBusiness, Building2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingState from '../../components/LoadingState';
import StatusBadge from '../../components/StatusBadge';
import { buscarFuncionarioPorId, excluirFuncionario } from '../../services/funcionariosService';
import type { Funcionario } from '../../types/funcionario';

interface LocationState {
  success?: string;
}

function CandidateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!id) {
      setError('ID do candidato não informado.');
      setLoading(false);
      return;
    }

    const parsedId = Number(id);
    if (Number.isNaN(parsedId)) {
      setError('ID do candidato inválido.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setFuncionario(await buscarFuncionarioPorId(parsedId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDelete() {
    if (!funcionario) return;
    try {
      setDeleting(true);
      await excluirFuncionario(funcionario.id);
      navigate('/candidatos', { state: { success: 'Candidato excluído com sucesso.' } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <LoadingState label="Carregando candidato..." />;

  if (error || !funcionario) {
    return (
      <div className="page-container">
        <FeedbackMessage type="error">{error || 'Candidato não encontrado.'}</FeedbackMessage>
        <button type="button" className="button button-secondary" onClick={() => navigate('/candidatos')}>
          Voltar para candidatos
        </button>
      </div>
    );
  }

  const success = (location.state as LocationState | null)?.success;

  return (
    <div className="page-container narrow-page">
      <button type="button" className="back-link" onClick={() => navigate('/candidatos')}>
        <ArrowLeft size={17} aria-hidden="true" /> Voltar para candidatos
      </button>

      {success && <FeedbackMessage type="success">{success}</FeedbackMessage>}
      {error && <FeedbackMessage type="error">{error}</FeedbackMessage>}

      <header className="candidate-detail-header">
        <div className="candidate-detail-identity">
          <span className="candidate-avatar candidate-avatar-large" aria-hidden="true">
            {funcionario.nome.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase()}
          </span>
          <div>
            <div className="candidate-name-row">
              <h1>{funcionario.nome}</h1>
              <StatusBadge status={funcionario.status} />
            </div>
            <p>{funcionario.cargo} • {funcionario.departamento || 'Sem departamento'}</p>
          </div>
        </div>

        <div className="detail-actions">
          <button type="button" className="button button-secondary" onClick={() => navigate(`/candidatos/${funcionario.id}/editar`)}>
            <Pencil size={17} aria-hidden="true" /> Editar
          </button>
          <button type="button" className="button button-danger-subtle" onClick={() => setDeleteOpen(true)}>
            <Trash2 size={17} aria-hidden="true" /> Excluir
          </button>
        </div>
      </header>

      <section className="content-card details-card">
        <h2>Informações do candidato</h2>
        <div className="details-grid">
          <div className="detail-group">
            <h3>Dados pessoais</h3>
            <div className="detail-item"><Mail size={18} /><div><span>E-mail</span><strong>{funcionario.email}</strong></div></div>
            <div className="detail-item"><Phone size={18} /><div><span>Telefone</span><strong>{funcionario.telefone || 'Não informado'}</strong></div></div>
            <div className="detail-item"><MapPin size={18} /><div><span>Cidade</span><strong>{funcionario.cidade || 'Não informada'}</strong></div></div>
          </div>
          <div className="detail-group">
            <h3>Vaga e contratação</h3>
            <div className="detail-item"><BriefcaseBusiness size={18} /><div><span>Cargo</span><strong>{funcionario.cargo}</strong></div></div>
            <div className="detail-item"><Building2 size={18} /><div><span>Departamento</span><strong>{funcionario.departamento || 'Não informado'}</strong></div></div>
            <div className="detail-item"><WalletCards size={18} /><div><span>Salário</span><strong>{funcionario.salario.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</strong></div></div>
          </div>
        </div>
        <div className="details-meta">ID {funcionario.id}</div>
      </section>

      <ConfirmDialog
        isOpen={deleteOpen}
        title={`Excluir ${funcionario.nome}?`}
        description="Esta ação removerá permanentemente o candidato e não poderá ser desfeita."
        confirmLabel="Excluir candidato"
        isLoading={deleting}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

export default CandidateDetails;
