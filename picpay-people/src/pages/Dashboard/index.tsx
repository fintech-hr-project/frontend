import { BriefcaseBusiness, Check, Clock3, Plus, Users, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateTable from '../../components/CandidateTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingState from '../../components/LoadingState';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/Pagination';
import SearchFilters from '../../components/SearchFilters';
import {
  excluirFuncionario,
  listarFuncionarios,
} from '../../services/funcionariosService';
import type { Funcionario } from '../../types/funcionario';

const ITEMS_PER_PAGE = 5;

function Dashboard() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [cargoFilter, setCargoFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Funcionario | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadFuncionarios = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await listarFuncionarios();
      setFuncionarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFuncionarios();
  }, [loadFuncionarios]);

  const cargos = useMemo(
    () => [...new Set(funcionarios.map((item) => item.cargo))].sort(),
    [funcionarios],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return funcionarios.filter((item) => {
      const matchesSearch =
        !term ||
        item.nome.toLowerCase().includes(term) ||
        item.cargo.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term);

      const matchesStatus = !statusFilter || item.status === statusFilter;
      const matchesCargo = !cargoFilter || item.cargo === cargoFilter;

      return matchesSearch && matchesStatus && matchesCargo;
    });
  }, [funcionarios, search, statusFilter, cargoFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, cargoFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const metrics = useMemo(
    () => ({
      total: funcionarios.length,
      analise: funcionarios.filter((item) => item.status === 'EM_ANALISE').length,
      aprovados: funcionarios.filter((item) => item.status === 'APROVADO').length,
      reprovados: funcionarios.filter((item) => item.status === 'REPROVADO').length,
      contratados: funcionarios.filter((item) => item.status === 'CONTRATADO').length,
    }),
    [funcionarios],
  );

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      setError('');
      await excluirFuncionario(deleteTarget.id);
      setFuncionarios((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      );
      setSuccess(`${deleteTarget.nome} foi excluído com sucesso.`);
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="page-container">
      <PageHeader
        title="Visão geral"
        subtitle="Acompanhe o processo seletivo e encontre candidatos rapidamente."
        action={
          <button
            type="button"
            className="button button-primary"
            onClick={() => navigate('/candidatos/novo')}
          >
            <Plus size={17} aria-hidden="true" />
            Novo candidato
          </button>
        }
      />

      <section className="metrics-grid" aria-label="Indicadores do processo seletivo">
        <article className="metric-card">
          <span className="metric-icon metric-green"><Users size={20} /></span>
          <div><strong>{metrics.total}</strong><span>Total</span></div>
        </article>
        <article className="metric-card">
          <span className="metric-icon metric-amber"><Clock3 size={20} /></span>
          <div><strong>{metrics.analise}</strong><span>Em análise</span></div>
        </article>
        <article className="metric-card">
          <span className="metric-icon metric-blue"><Check size={20} /></span>
          <div><strong>{metrics.aprovados}</strong><span>Aprovados</span></div>
        </article>
        <article className="metric-card">
          <span className="metric-icon metric-red"><X size={20} /></span>
          <div><strong>{metrics.reprovados}</strong><span>Reprovados</span></div>
        </article>
        <article className="metric-card">
          <span className="metric-icon metric-green"><BriefcaseBusiness size={20} /></span>
          <div><strong>{metrics.contratados}</strong><span>Contratados</span></div>
        </article>
      </section>

      {error && <FeedbackMessage type="error">{error}</FeedbackMessage>}
      {success && <FeedbackMessage type="success">{success}</FeedbackMessage>}

      <section className="content-card" aria-labelledby="candidate-list-title">
        <h2 id="candidate-list-title" className="sr-only">Lista de candidatos</h2>

        <SearchFilters
          search={search}
          status={statusFilter}
          cargo={cargoFilter}
          cargos={cargos}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onCargoChange={setCargoFilter}
        />

        <div className="list-meta">
          <strong>{filtered.length} candidatos</strong>
          <span>•</span>
          <span>Atualizado agora</span>
        </div>

        {loading ? (
          <LoadingState label="Carregando candidatos..." />
        ) : (
          <>
            <CandidateTable funcionarios={pageItems} onDelete={setDeleteTarget} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
              onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            />
          </>
        )}
      </section>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title={`Excluir ${deleteTarget?.nome ?? 'candidato'}?`}
        description="Esta ação removerá permanentemente o candidato e não poderá ser desfeita."
        confirmLabel="Excluir candidato"
        isLoading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

export default Dashboard;
