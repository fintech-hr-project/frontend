import axios from 'axios';
import { api } from './api';
import type { Employee, NewEmployee } from '../types/employee';

interface ApiErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
}

function handleApiError(error: unknown, defaultMessage: string): Error {
  if (axios.isAxiosError<ApiErrorResponse | string>(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === 'string' && responseData.trim()) {
      return new Error(responseData);
    }

    if (responseData && typeof responseData === 'object') {
      return new Error(responseData.message || responseData.error || defaultMessage);
    }

    if (!error.response) {
      return new Error(
        'Não foi possível conectar ao backend. Verifique se o Spring Boot está rodando.',
      );
    }
  }

  return new Error(defaultMessage);
}

export async function listEmployees(): Promise<Employee[]> {
  try {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Não foi possível carregar os candidatos.');
  }
}

export async function getEmployeeById(id: number): Promise<Employee> {
  try {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Não foi possível encontrar o candidato.');
  }
}

export async function createEmployee(employee: NewEmployee): Promise<Employee> {
  try {
    const response = await api.post<Employee>('/employees', employee);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Não foi possível cadastrar o candidato.');
  }
}
