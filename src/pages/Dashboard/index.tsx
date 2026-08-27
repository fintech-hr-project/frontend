import { BriefcaseBusiness, Check, Clock3, Plus, Users, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateTable from '../../components/CandidateTable';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingState from '../../components/LoadingState';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/Pagination';
import SearchFilters from '../../components/SearchFilters';
import { listEmployees } from '../../services/employeeService';
import type { Employee } from '../../types/employee';

const ITEMS_PER_PAGE = 5;

function Dashboard() {
  const navigate = useNavigate();
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
      const data = await listEmployees();
      setEmployees(data);
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

    return employees.filter((item) => {
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.role.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term);

      const matchesStatus = !statusFilter || item.status === statusFilter;
      const matchesRole = !roleFilter || item.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [employees, search, statusFilter, roleFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE));
  const pageItems = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const metrics = useMemo(
    () => ({
      total: employees.length,
      inAnalysis: employees.filter((item) => item.status === 'IN_ANALYSIS').length,
      approved: employees.filter((item) => item.status === 'APPROVED').length,
      rejected: employees.filter((item) => item.status === 'REJECTED').length,
      hired: employees.filter((item) => item.status === 'HIRED').length,
    }),
    [employees],
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Visão geral"
        subtitle="Acompanhe o processo seletivo e encontre candidatos rapidamente."
        action={
          <button
            type="button"
            className="button button-primary"
            onClick={() => navigate('/candidates/new')}
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
          <div><strong>{metrics.inAnalysis}</strong><span>Em análise</span></div>
        </article>
        <article className="metric-card">
          <span className="metric-icon metric-blue"><Check size={20} /></span>
          <div><strong>{metrics.approved}</strong><span>Aprovados</span></div>
        </article>
        <article className="metric-card">
          <span className="metric-icon metric-red"><X size={20} /></span>
          <div><strong>{metrics.rejected}</strong><span>Reprovados</span></div>
        </article>
        <article className="metric-card">
          <span className="metric-icon metric-green"><BriefcaseBusiness size={20} /></span>
          <div><strong>{metrics.hired}</strong><span>Contratados</span></div>
        </article>
      </section>

      {error && <FeedbackMessage type="error">{error}</FeedbackMessage>}

      <section className="content-card" aria-labelledby="candidate-list-title">
        <h2 id="candidate-list-title" className="sr-only">Lista de candidatos</h2>

        <SearchFilters
          search={search}
          status={statusFilter}
          role={roleFilter}
          roles={roles}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onRoleChange={setRoleFilter}
        />

        <div className="list-meta">
          <strong>{filteredEmployees.length} candidatos</strong>
        </div>

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

export default Dashboard;
