import React, { useState, useEffect } from "react";


const allMenuItems = {
  menuResponsavel: ["Home", "Financeiro", "Mural", "Contratos"],
  menuMotorista: ["Home", "Financeiro", "Rota", "Mural"],
  menuDono: ["Home", "Financeiro", "Rota", "Mural", "Motoristas", "Vans", "Contratos", "Avaliações"]
} as const;

type UserType = "responsavel" | "donorede" | "motorista"; 

export default function Homepage() {
  const [active, setActive] = useState("Home");
  const [page, setPage] = useState("Home");
  const [userType, setUserType] = useState<UserType | null>(null);  

  useEffect(() => {
    const userFromLogin = "motorista";
    setUserType(userFromLogin as UserType);
  }, []);

  if (!userType) {
    return <div>Carregando...</div>;
  }

  const menuItems = allMenuItems[`menu${userType.charAt(0).toUpperCase() + userType.slice(1)}` as keyof typeof allMenuItems];

  const handleMenuClick = (item: string) => {
    setActive(item);
    setPage(item);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-200 text-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Wise Vans</h1>
        <nav className="flex gap-8">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`hover:underline ${active === item ? "underline font-semibold" : ""}`}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-between mt-30">
        <div className="max-w-xl space-y-4">
          <h2 className="text-4xl font-bold">Bem-vindo(a) ao painel inicial!</h2>
          <p className="text-gray-700">Nesta tela será possível acessar:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li><strong>Home:</strong> Está que estamos!</li>
            <li><strong>Financeiro:</strong> Visualize sua situação de pagamentos.</li>
            <li><strong>Mural:</strong> Veja avisos importantes do motorista ou envie o seu aviso.</li>
            <li><strong>Contratos:</strong> Acesse os termos de uso do transporte.</li>

            {userType === "donorede" && (
              <>
                <li><strong>Motoristas:</strong> Gerencie motoristas cadastrados.</li>
                <li><strong>Vans:</strong> Gerencie vans disponíveis para transporte.</li>
                <li><strong>Avaliações:</strong> Acesse as avaliações feitas pelos usuários.</li>
              </>
            )}

            {userType === "motorista" && (
              <>
                <li><strong>Rota:</strong> Acesse informações sobre as rotas.</li>
              </>
            )}
          </ul>
        </div>

        <div className="w-[600px] h-[300px] overflow-hidden rounded-lg shadow-md">
          <img
            src="/vanescolar.jpg"
            className="h-full w-full object-cover"
            alt="Van"
          />
        </div>
      </div>

      {page !== "Home" && (
        <div className="p-8 text-center text-gray-500 text-xl">
          A tela <strong>{page}</strong> está em contrução.
        </div>
      )}

      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-auto">
        &copy; {new Date().getFullYear()} Wise Vans. Todos os direitos reservados.
      </footer>
    </div>
  );
}