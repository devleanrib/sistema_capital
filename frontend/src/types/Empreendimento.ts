export interface Empreendimento {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  valor_total: number;
  quantidade_unidades: number;
  valor_unidade: number;
  status: 'em_lancamento' | 'em_obras' | 'entregue';
  created_at: string;
  updated_at: string;
}

export type EmpreendimentoFormData = Omit<Empreendimento, 'id' | 'created_at' | 'updated_at'>;
