import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Empreendimento } from '../types/Empreendimento';
import { empreendimentoService } from '../services/empreendimentoService';

const STATUS_LABELS: Record<string, string> = {
  em_lancamento: 'Em lançamento',
  em_obras: 'Em obras',
  entregue: 'Entregue',
};

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'em_lancamento':
      return 'status-lancamento';
    case 'em_obras':
      return 'status-obras';
    case 'entregue':
      return 'status-entregue';
    default:
      return '';
  }
}

function EmpreendimentoView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [empreendimento, setEmpreendimento] = useState<Empreendimento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    empreendimentoService.getById(Number(id))
      .then((response) => {
        setEmpreendimento(response.data.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError('Empreendimento não encontrado');
        } else {
          setError('Erro ao carregar empreendimento');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="empreendimento-view">
        <div className="error">{error}</div>
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/empreendimentos')}
            className="btn btn-secondary"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!empreendimento) {
    return null;
  }

  return (
    <div className="empreendimento-view">
      <div className="page-header">
        <h2>{empreendimento.nome}</h2>
        <div className="actions">
          <button
            type="button"
            onClick={() => navigate(`/empreendimentos/${empreendimento.id}/editar`)}
            className="btn btn-primary"
          >
            Editar
          </button>
        </div>
      </div>

      <div className="view-details">
        <div className="detail-row">
          <span className="detail-label">Cidade</span>
          <span className="detail-value">{empreendimento.cidade}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Estado</span>
          <span className="detail-value">{empreendimento.estado}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Valor Total</span>
          <span className="detail-value detail-currency">
            {formatCurrency(empreendimento.valor_total)}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Quantidade de Unidades</span>
          <span className="detail-value">{empreendimento.quantidade_unidades}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Valor da Unidade</span>
          <span className="detail-value detail-currency">
            {formatCurrency(empreendimento.valor_unidade)}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value">
            <span className={`status-badge ${getStatusClass(empreendimento.status)}`}>
              {STATUS_LABELS[empreendimento.status] || empreendimento.status}
            </span>
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Criado em</span>
          <span className="detail-value">{formatDate(empreendimento.created_at)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Atualizado em</span>
          <span className="detail-value">{formatDate(empreendimento.updated_at)}</span>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate('/empreendimentos')}
          className="btn btn-secondary"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default EmpreendimentoView;
