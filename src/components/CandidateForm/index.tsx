import type { ChangeEvent, FormEvent } from 'react';
import type {
  EmployeeFormErrors,
  EmployeeStatus,
  NewEmployee,
} from '../../types/employee';
import FormField from '../FormField';

interface CandidateFormProps {
  value: NewEmployee;
  errors: EmployeeFormErrors;
  submitLabel: string;
  isSubmitting: boolean;
  onChange: (value: NewEmployee) => void;
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
      NewEmployee,
      'name' | 'email' | 'phone' | 'role' | 'department' | 'city'
    >,
  ) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, [field]: event.target.value });
    };
  }

  return (
    <form className="candidate-form" onSubmit={onSubmit} noValidate>
      <section className="form-section" aria-labelledby="personal-data-title">
        <div className="section-heading">
          <h2 id="personal-data-title">Dados pessoais</h2>
          <p>Informações de contato do candidato.</p>
        </div>

        <div className="form-grid">
          <FormField
            id="name"
            label="Nome completo"
            value={value.name}
            onChange={updateTextField('name')}
            required
            maxLength={100}
            error={errors.name}
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
            id="phone"
            label="Telefone"
            value={value.phone}
            onChange={updateTextField('phone')}
            maxLength={20}
            error={errors.phone}
            placeholder="(11) 99999-9999"
          />
          <FormField
            id="city"
            label="Cidade"
            value={value.city}
            onChange={updateTextField('city')}
            maxLength={80}
            error={errors.city}
            placeholder="Ex.: São Paulo"
          />
        </div>
      </section>

      <div className="form-divider" />

      <section className="form-section" aria-labelledby="job-data-title">
        <div className="section-heading">
          <h2 id="job-data-title">Vaga e contratação</h2>
          <p>Dados usados para acompanhar a candidatura.</p>
        </div>

        <div className="form-grid">
          <FormField
            id="role"
            label="Cargo"
            value={value.role}
            onChange={updateTextField('role')}
            required
            maxLength={100}
            error={errors.role}
            placeholder="Ex.: Desenvolvedor(a)"
          />
          <FormField
            id="department"
            label="Departamento"
            value={value.department}
            onChange={updateTextField('department')}
            maxLength={100}
            error={errors.department}
            placeholder="Ex.: Tecnologia"
          />
          <FormField
            id="salary"
            label="Salário"
            type="number"
            min={0}
            step={0.01}
            value={value.salary}
            onChange={(event) =>
              onChange({
                ...value,
                salary: Number(event.target.value),
              })
            }
            error={errors.salary}
          />

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={value.status}
              onChange={(event) =>
                onChange({
                  ...value,
                  status: event.target.value as EmployeeStatus,
                })
              }
            >
              <option value="IN_ANALYSIS">Em análise</option>
              <option value="APPROVED">Aprovado</option>
              <option value="REJECTED">Reprovado</option>
              <option value="HIRED">Contratado</option>
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
        <button type="submit" className="button button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CandidateForm;
