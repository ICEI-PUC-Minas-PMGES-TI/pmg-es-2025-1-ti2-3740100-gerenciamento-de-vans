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

export const maskDate = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 10; // DD/MM/AAAA tem 10 caracteres
  let { value } = event.currentTarget;
  
  return value
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{2})(\d)/, '$1/$2') // Coloca barra após os dois primeiros dígitos (dia)
    .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3') // Coloca barra após o mês
    .replace(/(\/\d{4})\d+?$/, '$1'); // Impede mais dígitos após o ano (AAAA)
}



export type MaskTypes = 'cpf' | 'phone' | 'cep' | 'data';

type Masks = Record<MaskTypes, (event: React.FormEvent<HTMLInputElement>) => string>;

const masks: Masks = {
  cpf: maskCpf,
  phone: maskPhone,
  cep: maskCEP,  
  data: maskDate,
};

export default masks;