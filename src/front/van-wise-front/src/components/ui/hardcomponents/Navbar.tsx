import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "@/components/ui/themebutton";
import { Button } from "@/components/ui/button";
import { BusFront, LogOut } from "lucide-react";
import { getUser, logout, User } from "@/auth";


export const Navbar = () => {
  const user = getUser();
  const handleLogout = () => {
    logout();
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-base font-semibold text-primary" 
      : "text-base font-medium text-muted-foreground transition-colors hover:text-primary"; 

  const getHomeRoute = (user: User | null) => {
  if (!user || !user.tipoUsuario) return '/login';
  switch (user.tipoUsuario.toLocaleLowerCase()) {
    case 'donoderede': return '/DonoHomePage';
    case 'motorista': return '/MotoristaHomePage';
    case 'responsavel': return '/homepage';
    default: return '/login';
  }
};
  const homeRoute = getHomeRoute(user);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">

        {/* 2. Seção da Esquerda: Logo e Nome como um link clicável */}
        <div className="flex items-center gap-6">
        <Link to={homeRoute} className="flex items-center gap-2 group">
          <BusFront className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tight">VanWise</span>
        </Link>

        {/* Seção Central: Links de Navegação (sem alterações) */}
        <nav className="hidden md:flex items-center gap-6">
          {user && user.tipoUsuario === 'donoderede' && (
            <>
              <NavLink to="/DonoHomePage" className={getNavLinkClass}>Dashboard</NavLink>
              <NavLink to="/financial" className={getNavLinkClass}>Financeiro</NavLink>
            </>
          )}
          {user && user.tipoUsuario === 'motorista' && (
            <>
              <NavLink to="/myroutes" className={getNavLinkClass}>Minhas Rotas</NavLink>
              <NavLink to="/financialmotorista" className={getNavLinkClass}>Financeiro</NavLink>
            </>
          )}
          {user && user.tipoUsuario === 'responsavel' && (
            <>
              <NavLink to="/checkin" className={getNavLinkClass}>Check-ins</NavLink>
              <NavLink to="/financialpassageiro" className={getNavLinkClass}>Meu Financeiro</NavLink>
            </>
          )}
        </nav>
        </div>

        {/* Seção da Direita: Ações (sem alterações) */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
};