import { Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CandidateTable from '../../components/CandidateTable';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingState from '../../components/LoadingState';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/Pagination';
import SearchFilters from '../../components/SearchFilters';
import { listEmployees } from '../../services/employeeService';
import type { Employee } from '../../types/employee';

interface LocationState {
  success?: string;
}

const ITEMS_PER_PAGE = 8;

function Candidates() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      setEmployees(await listEmployees());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEmployees();
  }, [loadEmployees]);

  const roles = useMemo(
    () => [...new Set(employees.map((item) => item.role))].sort(),
    [employees],
  );

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();

    return employees.filter((item) =>
      (!term ||
        item.name.toLowerCase().includes(term) ||
        item.role.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)) &&
      (!statusFilter || item.status === statusFilter) &&
      (!roleFilter || item.role === roleFilter),
    );
  }, [employees, search, statusFilter, roleFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE));
  const pageItems = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const success = (location.state as LocationState | null)?.success;

  return (
    <div className="page-container">
      <PageHeader
        title="Candidatos"
        subtitle="Consulte todos os candidatos cadastrados."
        action={
          <button
            type="button"
            className="button button-primary"
            onClick={() => navigate('/candidates/new')}
          >
            <Plus size={17} aria-hidden="true" /> Novo candidato
          </button>
        }
      />

      {success && <FeedbackMessage type="success">{success}</FeedbackMessage>}
      {error && <FeedbackMessage type="error">{error}</FeedbackMessage>}

      <section className="content-card">
        <SearchFilters
          search={search}
          status={statusFilter}
          role={roleFilter}
          roles={roles}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onRoleChange={setRoleFilter}
        />

        <div className="list-meta"><strong>{filteredEmployees.length} candidatos</strong></div>

        {loading ? (
          <LoadingState label="Carregando candidatos..." />
        ) : (
          <>
            <CandidateTable employees={pageItems} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
              onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default Candidates;
