interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="status-filter">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="filter-select"
      >
        <option value="">Todos os status</option>
        <option value="em_lancamento">Em lançamento</option>
        <option value="em_obras">Em obras</option>
        <option value="entregue">Entregue</option>
      </select>
    </div>
  );
}

export default StatusFilter;
