import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateForm from '../../components/CandidateForm';
import FeedbackMessage from '../../components/FeedbackMessage';
import PageHeader from '../../components/PageHeader';
import { criarFuncionario } from '../../services/funcionariosService';
import type { FuncionarioFormErros, NovoFuncionario } from '../../types/funcionario';
import { normalizarFuncionario, possuiErros, validarFuncionario } from '../../utils/validarFuncionario';

const initialForm: NovoFuncionario = {
  nome: '',
  email: '',
  telefone: '',
  cargo: '',
  departamento: '',
  salario: 0,
  cidade: '',
  status: 'EM_ANALISE',
};

function NewCandidate() {
  const navigate = useNavigate();
  const [form, setForm] = useState<NovoFuncionario>(initialForm);
  const [errors, setErrors] = useState<FuncionarioFormErros>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizarFuncionario(form);
    const validationErrors = validarFuncionario(normalized);
    setErrors(validationErrors);

    if (possuiErros(validationErrors)) return;

    try {
      setSubmitting(true);
      setErrorMessage('');
      const created = await criarFuncionario(normalized);
      navigate(`/candidatos/${created.id}`, {
        state: { success: 'Candidato cadastrado com sucesso.' },
      });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-container narrow-page">
      <button type="button" className="back-link" onClick={() => navigate('/candidatos')}>
        <ArrowLeft size={17} aria-hidden="true" />
        Voltar para candidatos
      </button>

      <PageHeader title="Novo candidato" subtitle="Cadastre uma pessoa no processo seletivo." />

      {errorMessage && <FeedbackMessage type="error">{errorMessage}</FeedbackMessage>}

      <section className="content-card form-card">
        <CandidateForm
          value={form}
          errors={errors}
          submitLabel="Salvar candidato"
          isSubmitting={submitting}
          onChange={setForm}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/candidatos')}
        />
      </section>
    </div>
  );
}

export default NewCandidate;
