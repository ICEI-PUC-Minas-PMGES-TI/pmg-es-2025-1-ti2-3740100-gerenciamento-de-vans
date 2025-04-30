import * as React from 'react';

// masks.ts

export const maskCpf = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 14;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d)(\d{2})$/, '$1-$2');
};

export const maskCEP = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 9;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
};

export const maskDate = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 10;
  let { value } = event.currentTarget;

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .replace(/(\/\d{4})\d+?$/, '$1');
};

export const maskPhone = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  let { value } = event.currentTarget;

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const maskCNPJ = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 18;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const maskANTT = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 11;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '');
};

export const maskCNH = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 11;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '');
};

export type MaskTypes =
  | 'cpf'
  | 'phone'
  | 'cep'
  | 'data'
  | 'cnpj'
  | 'antt'
  | 'cnh';

type Masks = Record<MaskTypes, (event: React.FormEvent<HTMLInputElement>) => string>;

const masks: Masks = {
  cpf: maskCpf,
  phone: maskPhone,
  cep: maskCEP,
  data: maskDate,
  cnpj: maskCNPJ,
  antt: maskANTT,
  cnh: maskCNH,
};

export default masks;
