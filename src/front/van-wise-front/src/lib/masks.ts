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

export const maskCnh = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 11;
  let { value } = event.currentTarget;

  return value
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, '$1 $2') // 000 000...
    .replace(/(\d{3}) (\d{3})(\d)/, '$1 $2 $3') // 000 000 000...
    .replace(/(\d{3}) (\d{3}) (\d{3})(\d{1,2})/, '$1 $2 $3-$4') // 000 000 000-00
    .replace(/(-\d{2})\d+?$/, '$1'); // Impede mais dígitos após os 11 números
}

export const maskAntt = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 12;
  let { value } = event.currentTarget;
  
  return value
    .replace(/\D/g, '') // Remove tudo que não for dígito
    .replace(/(\d{4})(\d)/, '$1.$2') // Aplica o ponto após os 4 primeiros dígitos
    .replace(/(\.\d{4})\d+?$/, '$1'); // Impede mais dígitos após os 8 números totais
}


export type MaskTypes = 'cpf' | 'phone' | 'cep' | 'data' | 'cnh' | 'antt';

type Masks = Record<MaskTypes, (event: React.FormEvent<HTMLInputElement>) => string>;

const masks: Masks = {
  cpf: maskCpf,
  phone: maskPhone,
  cep: maskCEP,  
  data: maskDate,
  cnh: maskCnh,
  antt: maskAntt
};

export default masks;