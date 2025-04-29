import React from "react";

export default function AdminHomePage() {
  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className="text-xl font-semibold">Dono da Rede - Início</h1>
        <nav className="space-x-4">
          <button>Minhas Rotas</button>
          <button>Financeiro</button>
          <button>Relatórios</button>
          <button>Suporte</button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">Adicionar Motorista</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded">Cadastrar Veículo</button>
          <button className="bg-gray-200 px-3 py-1 rounded">Perfil</button>
        </nav>
      </header>

      <section>
        <h2 className="text-lg font-medium">Frota</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-3 rounded text-center min-w-[120px]">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full" />
              <p>Modelo: xxxxxx</p>
              <p>Placa: xxxxxx</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Motoristas Ativos</h2>
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
              <p>Nome: xxxxxx</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-gray-100 p-8 rounded text-center">Rotas Ativas</div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Avaliações</h2>
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded w-60">
              <p className="italic">“This product brings so much value! I LOVE IT!”</p>
              <div className="mt-2 text-yellow-500">★★★★★</div>
              <p className="text-sm">Alex Turner</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
