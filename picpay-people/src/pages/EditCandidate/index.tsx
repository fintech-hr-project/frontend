import { ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CandidateForm from '../../components/CandidateForm';
import FeedbackMessage from '../../components/FeedbackMessage';
import LoadingState from '../../components/LoadingState';
import PageHeader from '../../components/PageHeader';
import {
  atualizarFuncionarioParcial,
  buscarFuncionarioPorId,
  editarFuncionario,
} from '../../services/funcionariosService';
import type { FuncionarioFormErros, NovoFuncionario } from '../../types/funcionario';
import { obterCamposAlterados, podeUsarPatch } from '../../utils/compararFuncionario';
import { normalizarFuncionario, possuiErros, validarFuncionario } from '../../utils/validarFuncionario';

function EditCandidate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [original, setOriginal] = useState<NovoFuncionario | null>(null);
  const [form, setForm] = useState<NovoFuncionario | null>(null);
  const [errors, setErrors] = useState<FuncionarioFormErros>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    if (!id) {
      setErrorMessage('ID do candidato não informado.');
      setLoading(false);
      return;
    }

    const parsedId = Number(id);
    if (Number.isNaN(parsedId)) {
      setErrorMessage('ID do candidato inválido.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await buscarFuncionarioPorId(parsedId);
      const value: NovoFuncionario = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cargo: data.cargo,
        departamento: data.departamento,
        salario: data.salario,
        cidade: data.cidade,
        status: data.status,
      };
      setOriginal(value);
      setForm(value);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!id || !form || !original) return;

    const normalized = normalizarFuncionario(form);
    const validationErrors = validarFuncionario(normalized);
    setErrors(validationErrors);
    if (possuiErros(validationErrors)) return;

    const changes = obterCamposAlterados(original, normalized);
    if (Object.keys(changes).length === 0) {
      setErrorMessage('Nenhuma alteração foi realizada.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');
      const parsedId = Number(id);

      if (podeUsarPatch(changes)) {
        await atualizarFuncionarioParcial(parsedId, changes);
      } else {
        await editarFuncionario(parsedId, normalized);
      }

      navigate(`/candidatos/${parsedId}`, {
        state: { success: 'Alterações salvas com sucesso.' },
      });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <LoadingState label="Carregando dados do candidato..." />;

  if (!form || !original) {
    return <FeedbackMessage type="error">{errorMessage || 'Candidato não encontrado.'}</FeedbackMessage>;
  }

  return (
    <div className="page-container narrow-page">
      <button type="button" className="back-link" onClick={() => navigate(`/candidatos/${id}`)}>
        <ArrowLeft size={17} aria-hidden="true" /> Voltar para o candidato
      </button>

      <PageHeader title="Editar candidato" subtitle="Revise os dados e salve somente quando estiver tudo certo." />

      {errorMessage && <FeedbackMessage type="error">{errorMessage}</FeedbackMessage>}

      <section className="content-card form-card">
        <CandidateForm
          value={form}
          errors={errors}
          submitLabel="Salvar alterações"
          isSubmitting={submitting}
          onChange={setForm}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/candidatos/${id}`)}
        />
      </section>
    </div>
  );
}

export default EditCandidate;
