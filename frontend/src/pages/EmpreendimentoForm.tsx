import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EmpreendimentoFormData } from '../types/Empreendimento';
import { empreendimentoService } from '../services/empreendimentoService';
import FormField from '../components/FormField';

const ESTADOS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

const STATUS_OPTIONS = [
  { value: 'em_lancamento', label: 'Em lançamento' },
  { value: 'em_obras', label: 'Em obras' },
  { value: 'entregue', label: 'Entregue' },
];

const initialFormData: EmpreendimentoFormData = {
  nome: '',
  cidade: '',
  estado: '',
  valor_total: 0,
  quantidade_unidades: 0,
  valor_unidade: 0,
  status: 'em_lancamento',
};

function EmpreendimentoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<EmpreendimentoFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      setLoadingData(true);
      empreendimentoService.getById(Number(id))
        .then((response) => {
          const { nome, cidade, estado, valor_total, quantidade_unidades, valor_unidade, status } = response.data.data;
          setFormData({ nome, cidade, estado, valor_total, quantidade_unidades, valor_unidade, status });
        })
        .catch(() => {
          setSubmitError('Erro ao carregar dados do empreendimento');
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, [id, isEditing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'nome' || name === 'cidade' || name === 'estado' || name === 'status' ? value : Number(value),
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'O nome é obrigatório';
    } else if (formData.nome.length > 255) {
      newErrors.nome = 'O nome não pode ter mais de 255 caracteres';
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'A cidade é obrigatória';
    } else if (formData.cidade.length > 255) {
      newErrors.cidade = 'A cidade não pode ter mais de 255 caracteres';
    }

    if (!formData.estado) {
      newErrors.estado = 'O estado é obrigatório';
    }

    if (!formData.valor_total || formData.valor_total <= 0) {
      newErrors.valor_total = 'O valor total deve ser maior que zero';
    }

    if (!formData.quantidade_unidades || formData.quantidade_unidades <= 0) {
      newErrors.quantidade_unidades = 'A quantidade de unidades deve ser maior que zero';
    }

    if (!formData.valor_unidade || formData.valor_unidade <= 0) {
      newErrors.valor_unidade = 'O valor da unidade deve ser maior que zero';
    }

    if (!formData.status) {
      newErrors.status = 'O status é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        await empreendimentoService.update(Number(id), formData);
      } else {
        await empreendimentoService.create(formData);
      }
      navigate('/empreendimentos');
    } catch (error: any) {
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const backendErrors: Record<string, string> = {};
        const validationErrors = error.response.data.errors;
        Object.keys(validationErrors).forEach((key) => {
          backendErrors[key] = validationErrors[key][0];
        });
        setErrors(backendErrors);
      } else {
        setSubmitError('Erro ao salvar empreendimento. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <div className="empreendimento-form">
      <div className="page-header">
        <h2>{isEditing ? 'Editar Empreendimento' : 'Novo Empreendimento'}</h2>
      </div>

      {submitError && <div className="error">{submitError}</div>}

      <form onSubmit={handleSubmit} className="form">
        <FormField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          required
          placeholder="Nome do empreendimento"
        />

        <FormField
          label="Cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          error={errors.cidade}
          required
          placeholder="Nome da cidade"
        />

        <FormField
          label="Estado"
          name="estado"
          type="select"
          value={formData.estado}
          onChange={handleChange}
          error={errors.estado}
          options={ESTADOS}
          required
        />

        <FormField
          label="Valor Total"
          name="valor_total"
          type="number"
          value={formData.valor_total}
          onChange={handleChange}
          error={errors.valor_total}
          required
          placeholder="0.00"
        />

        <FormField
          label="Quantidade de Unidades"
          name="quantidade_unidades"
          type="number"
          value={formData.quantidade_unidades}
          onChange={handleChange}
          error={errors.quantidade_unidades}
          required
          placeholder="0"
        />

        <FormField
          label="Valor da Unidade"
          name="valor_unidade"
          type="number"
          value={formData.valor_unidade}
          onChange={handleChange}
          error={errors.valor_unidade}
          required
          placeholder="0.00"
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={handleChange}
          error={errors.status}
          options={STATUS_OPTIONS}
          required
        />

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/empreendimentos')}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmpreendimentoForm;
