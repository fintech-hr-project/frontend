import type { ChangeEvent, FormEvent } from 'react';
import type {
  FuncionarioFormErros,
  NovoFuncionario,
  StatusFuncionario,
} from '../../types/funcionario';
import FormField from '../FormField';

interface CandidateFormProps {
  value: NovoFuncionario;
  errors: FuncionarioFormErros;
  submitLabel: string;
  isSubmitting: boolean;
  onChange: (value: NovoFuncionario) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

function CandidateForm({
  value,
  errors,
  submitLabel,
  isSubmitting,
  onChange,
  onSubmit,
  onCancel,
}: CandidateFormProps) {
  function updateTextField(
    field: keyof Pick<
      NovoFuncionario,
      'nome' | 'email' | 'telefone' | 'cargo' | 'departamento' | 'cidade'
    >,
  ) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, [field]: event.target.value });
    };
  }

  return (
    <form className="candidate-form" onSubmit={onSubmit} noValidate>
      <section className="form-section" aria-labelledby="dados-pessoais-title">
        <div className="section-heading">
          <h2 id="dados-pessoais-title">Dados pessoais</h2>
          <p>Informações de contato do candidato.</p>
        </div>

        <div className="form-grid">
          <FormField
            id="nome"
            label="Nome completo"
            value={value.nome}
            onChange={updateTextField('nome')}
            required
            maxLength={100}
            error={errors.nome}
            placeholder="Ex.: Ana Souza"
          />
          <FormField
            id="email"
            label="E-mail"
            type="email"
            value={value.email}
            onChange={updateTextField('email')}
            required
            maxLength={120}
            error={errors.email}
            placeholder="nome@email.com"
          />
          <FormField
            id="telefone"
            label="Telefone"
            value={value.telefone}
            onChange={updateTextField('telefone')}
            maxLength={20}
            error={errors.telefone}
            placeholder="(11) 99999-9999"
          />
          <FormField
            id="cidade"
            label="Cidade"
            value={value.cidade}
            onChange={updateTextField('cidade')}
            maxLength={80}
            error={errors.cidade}
            placeholder="Ex.: São Paulo"
          />
        </div>
      </section>

      <div className="form-divider" />

      <section className="form-section" aria-labelledby="vaga-title">
        <div className="section-heading">
          <h2 id="vaga-title">Vaga e contratação</h2>
          <p>Dados usados para acompanhar a candidatura.</p>
        </div>

        <div className="form-grid">
          <FormField
            id="cargo"
            label="Cargo"
            value={value.cargo}
            onChange={updateTextField('cargo')}
            required
            maxLength={100}
            error={errors.cargo}
            placeholder="Ex.: Desenvolvedor(a)"
          />
          <FormField
            id="departamento"
            label="Departamento"
            value={value.departamento}
            onChange={updateTextField('departamento')}
            maxLength={100}
            error={errors.departamento}
            placeholder="Ex.: Tecnologia"
          />
          <FormField
            id="salario"
            label="Salário"
            type="number"
            min={0}
            step={0.01}
            value={value.salario}
            onChange={(event) =>
              onChange({
                ...value,
                salario: Number(event.target.value),
              })
            }
            error={errors.salario}
          />

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={value.status}
              onChange={(event) =>
                onChange({
                  ...value,
                  status: event.target.value as StatusFuncionario,
                })
              }
            >
              <option value="EM_ANALISE">Em análise</option>
              <option value="APROVADO">Aprovado</option>
              <option value="REPROVADO">Reprovado</option>
              <option value="CONTRATADO">Contratado</option>
            </select>
          </div>
        </div>
      </section>

      <div className="form-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="button button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CandidateForm;
