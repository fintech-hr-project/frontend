export type StatusFuncionario =
  | 'EM_ANALISE'
  | 'APROVADO'
  | 'REPROVADO'
  | 'CONTRATADO';

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  salario: number;
  cidade: string;
  status: StatusFuncionario;
}

export type NovoFuncionario = Omit<Funcionario, 'id'>;
export type AtualizacaoFuncionario = Partial<NovoFuncionario>;

export interface FuncionarioFormErros {
  nome?: string;
  email?: string;
  telefone?: string;
  cargo?: string;
  departamento?: string;
  salario?: string;
  cidade?: string;
  status?: string;
}
