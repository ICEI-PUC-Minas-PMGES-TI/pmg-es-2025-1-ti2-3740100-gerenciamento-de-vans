import React from "react";

export default function DriverHomePage() {
  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className="text-xl font-semibold">Motorista - Início</h1>
        <nav className="space-x-4">
          <button>Minhas Rotas</button>
          <button>Financeiro</button>
          <button>Relatórios</button>
          <button>Suporte</button>
          <button className="bg-gray-200 px-3 py-1 rounded">Perfil</button>
        </nav>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">Mapa</div>
        <div className="bg-gray-100 p-4 rounded">Passageiros</div>
        <div className="bg-gray-100 p-4 rounded">Histórico</div>
        <div className="bg-gray-100 p-4 rounded">Agenda</div>
        <div className="bg-gray-100 p-4 rounded col-span-2">Mural de Notificações</div>
        <div className="bg-gray-100 p-4 rounded col-span-2">Infos do Motorista</div>
      </section>
    </div>
  );
}
