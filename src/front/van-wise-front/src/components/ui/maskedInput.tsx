import InputMask from 'react-input-mask';

interface MaskedInputProps {
  type: 'cpf' | 'cnpj' | 'phone' | 'cep' | 'date';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}
export const maskedInput = ({
  type,
  value,
  onChange,
  placeholder,
  className = 'w-full p-2 border rounded-md',
}: MaskedInputProps) => {
  const masks = {
    cpf: '999.999.999-99',
    cnpj: '99.999.999/9999-99',
    phone: '(99) 99999-9999',
    cep: '99999-999',
    date: '99/99/9999',
  };
  return (
    <InputMask
      mask={masks[type]}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  )
};
