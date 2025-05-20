import React, { useState } from "react";
import ContractForm from "./ContractForm"; // <-- importa o componente

const menuItems = [
  "Home",
  "Financeiro",
  "Mural",
  "Contratos",
  "Rota",
  "Vans",
  "Avaliações"
];

export default function Homepage() {
  const [active, setActive] = useState("Home");
  const [page, setPage] = useState("Home");

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

      {page === "Home" && (
        <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-between mt-30">
          <div className="max-w-xl space-y-4">
            <h2 className="text-4xl font-bold">Bem-vindo(a) ao painel inicial!</h2>
            <p className="text-gray-700">Nesta tela será possível acessar:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li><strong>Home:</strong> Está que estamos!</li>
              <li><strong>Financeiro:</strong> Visualize sua situação de pagamentos.</li>
              <li><strong>Mural:</strong> Veja avisos importantes ou envie o seu aviso.</li>
              <li><strong>Contratos:</strong> Acesse os termos de uso do transporte.</li>
              <li><strong>Rota:</strong> Informações sobre as rotas.</li>
              <li><strong>Vans:</strong> Gerenciamento de vans.</li>
              <li><strong>Avaliações:</strong> Veja e envie avaliações.</li>
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
      )}

      {page === "Contratos" && (
        <div className="p-8">
          <ContractForm />
        </div>
      )}

      {page !== "Home" && page !== "Contratos" && (
        <div className="p-8 text-center text-gray-500 text-xl">
          A tela <strong>{page}</strong> está em construção.
        </div>
      )}

      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-auto">
        &copy; {new Date().getFullYear()} Wise Vans. Todos os direitos reservados.
      </footer>
    </div>
  );
}