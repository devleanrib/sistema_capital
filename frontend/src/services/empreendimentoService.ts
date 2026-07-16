import axios from 'axios';
import { Empreendimento, EmpreendimentoFormData } from '../types/Empreendimento';

const api = axios.create({
  baseURL: '/api',
});

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const empreendimentoService = {
  list: (params?: { busca?: string; status?: string }) =>
    api.get<ApiResponse<Empreendimento[]>>('/empreendimentos', { params }),

  getById: (id: number) =>
    api.get<ApiResponse<Empreendimento>>(`/empreendimentos/${id}`),

  create: (data: EmpreendimentoFormData) =>
    api.post<ApiResponse<Empreendimento>>('/empreendimentos', data),

  update: (id: number, data: EmpreendimentoFormData) =>
    api.put<ApiResponse<Empreendimento>>(`/empreendimentos/${id}`, data),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/empreendimentos/${id}`),
};
