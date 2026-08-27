import { Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateTable from '../../components/CandidateTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingState from '../../components/LoadingState';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/Pagination';
import SearchFilters from '../../components/SearchFilters';
import { excluirFuncionario, listarFuncionarios } from '../../services/funcionariosService';
import type { Funcionario } from '../../types/funcionario';

const ITEMS_PER_PAGE = 8;

function Candidates() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [cargoFilter, setCargoFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Funcionario | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      setFuncionarios(await listarFuncionarios());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const cargos = useMemo(
    () => [...new Set(funcionarios.map((item) => item.cargo))].sort(),
    [funcionarios],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return funcionarios.filter((item) =>
      (!term || item.nome.toLowerCase().includes(term) || item.cargo.toLowerCase().includes(term) || item.email.toLowerCase().includes(term)) &&
      (!statusFilter || item.status === statusFilter) &&
      (!cargoFilter || item.cargo === cargoFilter),
    );
  }, [funcionarios, search, statusFilter, cargoFilter]);

  useEffect(() => setCurrentPage(1), [search, statusFilter, cargoFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await excluirFuncionario(deleteTarget.id);
      setFuncionarios((current) => current.filter((item) => item.id !== deleteTarget.id));
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
        title="Candidatos"
        subtitle="Consulte e gerencie todos os candidatos cadastrados."
        action={
          <button type="button" className="button button-primary" onClick={() => navigate('/candidatos/novo')}>
            <Plus size={17} aria-hidden="true" /> Novo candidato
          </button>
        }
      />

      {error && <FeedbackMessage type="error">{error}</FeedbackMessage>}

      <section className="content-card">
        <SearchFilters
          search={search}
          status={statusFilter}
          cargo={cargoFilter}
          cargos={cargos}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onCargoChange={setCargoFilter}
        />
        <div className="list-meta"><strong>{filtered.length} candidatos</strong></div>
        {loading ? <LoadingState /> : (
          <>
            <CandidateTable funcionarios={pageItems} onDelete={setDeleteTarget} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            />
          </>
        )}
      </section>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title={`Excluir ${deleteTarget?.nome ?? 'candidato'}?`}
        description="Esta ação removerá permanentemente o candidato e não poderá ser desfeita."
        isLoading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

export default Candidates;
