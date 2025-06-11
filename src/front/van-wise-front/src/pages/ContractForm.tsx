import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/ui/themebutton";
import { Dialog } from "@headlessui/react";
//import { Contract, columns } from "@/components/ui/columns";
//import { DataTable } from "@/components/ui/contract-page-components/data-table";

type Contract = {
  id: string;
  name: string;
  email: string;
  status: string;
};

/*  async function getData(): Promise<Contract[]> {
  return [
    { id: "1", name: "Lucas", email: "lucas@gmail.com", status: "Aguardando confirmação" },
    { id: "2", name: "Maria", email: "maria@example.com", status: "Aguardando confirmação" },
    { id: "3", name: "Ana", email: "ana@example.com", status: "Aguardando confirmação" },
    { id: "4", name: "Edward", email: "edward@example.com", status: "Aguardando confirmação" },
  ];
} */

export default function ContractForm() {
  const [data, setData] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
    fetch("http://localhost:8081/contracts")
      .then((response) => response.json())
      .then((contracts) => setData(contracts))
      .catch((error) => console.error("Erro ao carregar contratos:", error));
  }, []);


  const openModal = (contract: Contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const confirmContract = () => {
  if (!selectedContract) return;

  fetch(`http://localhost:8081/contracts/${selectedContract.id}/confirmar`, {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao confirmar contrato");
      return response.json();
    })
    .then((updatedContract) => {
      const updatedData = data.map((contract) =>
        contract.id === selectedContract.id ? updatedContract : contract
      );

      setData(updatedData);
      setIsModalOpen(false);
      setSelectedContract(null);
    })
    .catch((error) => console.error("Erro ao confirmar contrato:", error));
};


const addContract = () => {
  if (!newName.trim() || !newEmail.trim()) return;

  const newContract = {
    name: newName,
    email: newEmail,
    status: "Aguardando confirmação",
  };

  fetch("http://localhost:8081/contracts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContract),
  })
    .then((response) => response.json())
    .then((savedContract) => {
      setData((prevData) => [...prevData, savedContract]);
      setIsAddModalOpen(false);
      setNewName("");
      setNewEmail("");
    })
    .catch((error) => console.error("Erro ao adicionar contrato:", error));
};


  return (
    <div className="min-h-screen flex flex-col">
      {/* Toggle de Tema */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

    
      {/* Conteúdo Principal */}
      <main className="p-8 flex flex-col gap-10">
        <section className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Lista de Contratos</h2>
            <button
              className="x-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-700"
              style={{ padding: "10px 20px"}}
              onClick={() => setIsAddModalOpen(true)}
            >
              Adicionar Contrato
            </button>
          </div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((contract) => (
                <tr key={contract.id} className="border-t">
                  <td className="px-4 py-2">{contract.name}</td>
                  <td className="px-4 py-2">{contract.email}</td>
                  <td className="px-4 py-2">{contract.status}</td>
                  <td className="px-4 py-2 text-center">
                    {contract.status === "Aguardando confirmação" && (
                      <button
                        className="bg-yellow-300 text-black px-3 py-1 rounded hover:bg-yellow-400"
                        onClick={() => openModal(contract)}>
                        Confirmar contrato
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Modal de Confirmação */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <Dialog.Title className="text-xl font-bold mb-4">Confirmar Contrato</Dialog.Title>
            {selectedContract && (
              <div className="mb-4">
                <p><strong>Nome:</strong> {selectedContract.name}</p>
                <p><strong>Email:</strong> {selectedContract.email}</p>
                <p><strong>Status atual:</strong> {selectedContract.status}</p>
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={confirmContract}
              >
                Confirmar Contrato
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal de Adicionar Contrato */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <Dialog.Title className="text-xl font-bold mb-4">Novo Contrato</Dialog.Title>
            <div className="flex flex-col gap-4 mb-4">
              <input
                type="text"
                placeholder="Nome"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={addContract}
              >
                Adicionar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}