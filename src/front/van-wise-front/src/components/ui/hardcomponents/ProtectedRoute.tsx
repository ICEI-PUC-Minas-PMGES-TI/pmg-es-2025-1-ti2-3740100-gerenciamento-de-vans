import { Navigate, Outlet } from "react-router-dom";
import { getUser, User } from "@/auth";

interface ProtectedRouteProps {
  allowedRoles: User['tipoUsuario'][];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = getUser();

  // 1. Se não há usuário logado, redireciona para a página de login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Verifica se o tipo do usuário (convertido para maiúsculas) está na lista de perfis permitidos.
  const userRole = user.tipoUsuario;
  
  // 3. Se o usuário tem a permissão, renderiza a página (através do <Outlet />).
  //    Caso contrário, redireciona para a página inicial.
  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};