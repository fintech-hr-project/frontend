import type { EmployeeFormErrors, NewEmployee } from '../types/employee';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmployee(employee: NewEmployee): NewEmployee {
  return {
    ...employee,
    name: employee.name.trim(),
    email: employee.email.trim().toLowerCase(),
    phone: employee.phone.trim(),
    role: employee.role.trim(),
    department: employee.department.trim(),
    city: employee.city.trim(),
  };
}

export function validateEmployee(employee: NewEmployee): EmployeeFormErrors {
  const errors: EmployeeFormErrors = {};

  if (!employee.name.trim()) {
    errors.name = 'Informe o nome completo.';
  } else if (employee.name.trim().length > 100) {
    errors.name = 'O nome deve ter no máximo 100 caracteres.';
  }

  if (!employee.email.trim()) {
    errors.email = 'Informe o e-mail.';
  } else if (!EMAIL_REGEX.test(employee.email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!employee.role.trim()) {
    errors.role = 'Informe o cargo.';
  }

  if (employee.phone.length > 20) {
    errors.phone = 'O telefone deve ter no máximo 20 caracteres.';
  }

  if (employee.salary < 0) {
    errors.salary = 'O salário não pode ser negativo.';
  }

  return errors;
}

export function hasErrors(errors: EmployeeFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
