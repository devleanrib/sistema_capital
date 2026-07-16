import { Empreendimento } from '../types/Empreendimento';

interface EmpreendimentosTableProps {
  empreendimentos: Empreendimento[];
  onDelete: (id: number) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    em_lancamento: 'Em lançamento',
    em_obras: 'Em obras',
    entregue: 'Entregue',
  };
  return labels[status] || status;
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    em_lancamento: 'status-lancamento',
    em_obras: 'status-obras',
    entregue: 'status-entregue',
  };
  return classes[status] || '';
}

function EmpreendimentosTable({ empreendimentos, onDelete }: EmpreendimentosTableProps) {
  if (empreendimentos.length === 0) {
    return <div className="empty-state">Nenhum empreendimento encontrado</div>;
  }

  return (
    <div className="table-container">
      <table className="empreendimentos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Valor Total</th>
            <th>Unidades</th>
            <th>Valor/Unidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empreendimentos.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.nome}</td>
              <td>{emp.cidade}</td>
              <td>{emp.estado}</td>
              <td>{formatCurrency(emp.valor_total)}</td>
              <td>{emp.quantidade_unidades}</td>
              <td>{formatCurrency(emp.valor_unidade)}</td>
              <td>
                <span className={`status-badge ${getStatusClass(emp.status)}`}>
                  {getStatusLabel(emp.status)}
                </span>
              </td>
              <td className="actions">
                <a href={`/empreendimentos/${emp.id}`} className="btn btn-small">
                  Ver
                </a>
                <a href={`/empreendimentos/${emp.id}/editar`} className="btn btn-small btn-secondary">
                  Editar
                </a>
                <button
                  onClick={() => onDelete(emp.id)}
                  className="btn btn-small btn-danger"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmpreendimentosTable;
