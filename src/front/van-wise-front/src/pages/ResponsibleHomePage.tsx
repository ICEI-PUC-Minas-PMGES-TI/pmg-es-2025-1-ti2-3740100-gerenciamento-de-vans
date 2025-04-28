import React from "react";

export default function ResponsibleHomePage() {
  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className="text-xl font-semibold">Responsável - Início</h1>
        <nav className="space-x-4">
          <button>Notificações</button>
          <button>Financeiro</button>
          <button>Relatórios</button>
          <button>Suporte</button>
          <button className="bg-gray-200 px-3 py-1 rounded">Perfil</button>
        </nav>
      </header>

      <section>
        <h2 className="text-lg font-medium">Informações</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">Mensagem 1</div>
          <div className="bg-gray-100 p-4 rounded">Mensagem 2</div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Filhos</h2>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto" />
            <p>Nome Filho</p>
            <button className="mt-1 text-sm underline">Notificar</button>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto" />
            <p>Nome Filho</p>
            <button className="mt-1 text-sm underline">Notificar</button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Notificações</h2>
        <div className="space-y-2">
          <div className="bg-gray-100 p-3 rounded">Mensagem do Motorista 1</div>
          <div className="bg-gray-100 p-3 rounded">Mensagem do Motorista 2</div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Contatos</h2>
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-gray-100 p-3 rounded">Motorista</button>
          <button className="bg-gray-100 p-3 rounded">Filho</button>
          <button className="bg-gray-100 p-3 rounded">Colégio</button>
        </div>
      </section>
    </div>
  );
}
