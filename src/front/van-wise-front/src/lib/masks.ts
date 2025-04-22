import * as React from 'react';

export const maskPhone = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '') // Remove non-digit characters
    .replace(/(\d{2})(\d)/, '($1) $2') // Format as (XX) X
    .replace(/(\d)(\d{4})$/, '$1-$2'); // Format as XXXX-XXXX
}
export const maskCpf = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 14;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '') // Remove non-digit characters
    .replace(/(\d{3})(\d)/, '$1.$2') // Format as XXX.XXX
    .replace(/(\d{3})(\d)/, '$1.$2') // Format as XXX.XXX.XXX
    .replace(/(\d)(\d{2})$/, '$1-$2'); // Format as XXX.XXX.XXX-XX
}
export const maskCEP = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 9;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2'); // Format as XXXXX-XXX
}


export type MaskTypes = 'cpf' | 'phone' | 'cep';

type Masks = Record<MaskTypes, (event: React.FormEvent<HTMLInputElement>) => string>;

const masks: Masks = {
  cpf: maskCpf,
  phone: maskPhone,
  cep: maskCEP,  
};

export default masks;