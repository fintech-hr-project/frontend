import type {
  FuncionarioFormErros,
  NovoFuncionario,
} from '../types/funcionario';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizarFuncionario(
  funcionario: NovoFuncionario,
): NovoFuncionario {
  return {
    ...funcionario,
    nome: funcionario.nome.trim(),
    email: funcionario.email.trim().toLowerCase(),
    telefone: funcionario.telefone.trim(),
    cargo: funcionario.cargo.trim(),
    departamento: funcionario.departamento.trim(),
    cidade: funcionario.cidade.trim(),
  };
}

export function validarFuncionario(
  funcionario: NovoFuncionario,
): FuncionarioFormErros {
  const erros: FuncionarioFormErros = {};

  if (!funcionario.nome.trim()) {
    erros.nome = 'Informe o nome completo.';
  } else if (funcionario.nome.trim().length > 100) {
    erros.nome = 'O nome deve ter no máximo 100 caracteres.';
  }

  if (!funcionario.email.trim()) {
    erros.email = 'Informe o e-mail.';
  } else if (!EMAIL_REGEX.test(funcionario.email.trim())) {
    erros.email = 'Informe um e-mail válido.';
  }

  if (!funcionario.cargo.trim()) {
    erros.cargo = 'Informe o cargo.';
  }

  if (funcionario.telefone.length > 20) {
    erros.telefone = 'O telefone deve ter no máximo 20 caracteres.';
  }

  if (funcionario.salario < 0) {
    erros.salario = 'O salário não pode ser negativo.';
  }

  return erros;
}

export function possuiErros(erros: FuncionarioFormErros): boolean {
  return Object.keys(erros).length > 0;
}
