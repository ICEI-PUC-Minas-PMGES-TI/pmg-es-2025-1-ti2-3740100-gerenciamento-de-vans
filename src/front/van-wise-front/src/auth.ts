export interface User {
  idUsuario: number;
  nome: string;
  tipoUsuario: 'donoderede' | 'motorista' | 'responsavel'; 
}

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch (e) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};