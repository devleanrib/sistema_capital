import { ChangeEvent } from 'react';

interface FormFieldOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'select';
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  options?: FormFieldOption[];
  required?: boolean;
  placeholder?: string;
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  options,
  required = false,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'form-input-error' : ''}`}
        >
          <option value="">Selecione...</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input ${error ? 'form-input-error' : ''}`}
        />
      )}

      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default FormField;
