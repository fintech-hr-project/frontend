import axios from 'axios';
import { api } from './api';
import type {
  AtualizacaoFuncionario,
  Funcionario,
  NovoFuncionario,
} from '../types/funcionario';

function tratarErro(error: unknown, mensagemPadrao: string): Error {
  if (axios.isAxiosError(error)) {
    const mensagemApi =
      typeof error.response?.data === 'string'
        ? error.response.data
        : undefined;

    return new Error(mensagemApi || mensagemPadrao);
  }

  return new Error(mensagemPadrao);
}

export async function listarFuncionarios(): Promise<Funcionario[]> {
  try {
    const response = await api.get<Funcionario[]>('/funcionarios');
    return response.data;
  } catch (error) {
    throw tratarErro(error, 'Não foi possível carregar os candidatos.');
  }
}

export async function buscarFuncionarioPorId(id: number): Promise<Funcionario> {
  try {
    const response = await api.get<Funcionario>(`/funcionarios/${id}`);
    return response.data;
  } catch (error) {
    throw tratarErro(error, 'Não foi possível encontrar o candidato.');
  }
}

export async function criarFuncionario(
  funcionario: NovoFuncionario,
): Promise<Funcionario> {
  try {
    const response = await api.post<Funcionario>('/funcionarios', funcionario);
    return response.data;
  } catch (error) {
    throw tratarErro(error, 'Não foi possível cadastrar o candidato.');
  }
}

export async function editarFuncionario(
  id: number,
  funcionario: NovoFuncionario,
): Promise<Funcionario> {
  try {
    const response = await api.put<Funcionario>(
      `/funcionarios/${id}`,
      funcionario,
    );
    return response.data;
  } catch (error) {
    throw tratarErro(error, 'Não foi possível salvar as alterações.');
  }
}

export async function atualizarFuncionarioParcial(
  id: number,
  dados: AtualizacaoFuncionario,
): Promise<Funcionario> {
  try {
    const response = await api.patch<Funcionario>(
      `/funcionarios/${id}`,
      dados,
    );
    return response.data;
  } catch (error) {
    throw tratarErro(error, 'Não foi possível atualizar o candidato.');
  }
}

export async function excluirFuncionario(id: number): Promise<void> {
  try {
    await api.delete(`/funcionarios/${id}`);
  } catch (error) {
    throw tratarErro(error, 'Não foi possível excluir o candidato.');
  }
}
