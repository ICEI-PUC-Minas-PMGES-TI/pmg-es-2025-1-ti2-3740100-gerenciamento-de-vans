import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      {/* O <Outlet> renderiza a rota filha que corresponde à URL atual */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};