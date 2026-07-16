import { useState, useEffect } from 'react';
import { Empreendimento } from '../types/Empreendimento';
import { empreendimentoService } from '../services/empreendimentoService';
import EmpreendimentosTable from '../components/EmpreendimentosTable';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import ConfirmDialog from '../components/ConfirmDialog';

function EmpreendimentosList() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [busca, setBusca] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
    nome: string;
  }>({ isOpen: false, id: null, nome: '' });

  const fetchEmpreendimentos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await empreendimentoService.list({
        busca: busca || undefined,
        status: statusFilter || undefined,
      });
      setEmpreendimentos(response.data.data);
    } catch (err) {
      setError('Erro ao carregar empreendimentos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpreendimentos();
  }, [busca, statusFilter]);

  const handleDeleteClick = (id: number, nome: string) => {
    setDeleteDialog({ isOpen: true, id, nome });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id) return;

    try {
      await empreendimentoService.delete(deleteDialog.id);
      setEmpreendimentos(empreendimentos.filter(e => e.id !== deleteDialog.id));
      setDeleteDialog({ isOpen: false, id: null, nome: '' });
    } catch (err) {
      alert('Erro ao excluir empreendimento');
      console.error(err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, id: null, nome: '' });
  };

  return (
    <div className="empreendimentos-list">
      <div className="page-header">
        <h2>Empreendimentos</h2>
        <a href="/empreendimentos/novo" className="btn btn-primary">
          Novo Empreendimento
        </a>
      </div>

      <div className="filters">
        <SearchBar value={busca} onChange={setBusca} />
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {loading && <div className="loading">Carregando...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <EmpreendimentosTable
          empreendimentos={empreendimentos}
          onDelete={(id) => {
            const emp = empreendimentos.find(e => e.id === id);
            handleDeleteClick(id, emp?.nome || '');
          }}
        />
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Excluir Empreendimento"
        message={`Tem certeza que deseja excluir o empreendimento "${deleteDialog.nome}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </div>
  );
}

export default EmpreendimentosList;
