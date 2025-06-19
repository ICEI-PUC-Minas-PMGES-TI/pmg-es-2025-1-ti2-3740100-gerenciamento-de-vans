import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ContractForm from "./ContractForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const menuItems = [
  { nome: "Contrato", path: "/ContractForm" },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contrato" element={<ContractForm />} />
      </Routes>
    </BrowserRouter>
  );
}

const passageiros = [
  { nome: "João", van: "ABC-1234", turno: "Manhã" },
  { nome: "Maria", van: "DEF-5678", turno: "Tarde" },
];

const motoristas = [
  { nome: "Carlos Andrade", van: "ABC-1234" },
  { nome: "Fernanda Lima", van: "DEF-5678" },
];

const rotas = [
  { turno: "Manhã", origem: "Bairro A", destino: "Colégio X", horario: "07:00 - 07:45" },
  { turno: "Tarde", origem: "Bairro B", destino: "Escola Y", horario: "13:00 - 13:50" },
];


export default function DonoRedeHomepage() {
  const [active, setActive] = useState("Rota");
  const [vans, setVans] = useState([
    { placa: "ABC-1234", modelo: "Sprinter 16L", capacidade: 16 },
    { placa: "DEF-5678", modelo: "Master 20L", capacidade: 20 },
  ]);

  const [vansExcluidas, setVansExcluidas] = useState(0);
  const [motoristas, setMotoristas] = useState<any[]>([]);


  const [showModal, setShowModal] = useState(false);
  const [novaVan, setNovaVan] = useState({
    modelo: "",
    placa: "",
    capacidade: "",
    bairroInicial: "",
    destinoFinal: "",
    horarios: "",
    turnos: "",
    preco: "",
    cpf_motorista: ""
  });

  const handleMenuClick = (item: string) => setActive(item);

  const [responsaveis, setResponsaveis] = useState<any[]>([]);
  const [rotas, setRotas] = useState<any[]>([]);




const verificarCpfMotorista = async (cpf: string): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8081/usuarios/existe/${cpf}`);
    if (!res.ok) throw new Error("Erro na verificação do CPF");
    const existe = await res.json();
    return existe;
  } catch (error) {
    console.error("Erro ao verificar CPF do motorista:", error);
    return false;
  }
};


const handleAddVan = async () => {
  try {
    const cpfValido = await verificarCpfMotorista(novaVan.cpf_motorista);
    if (!cpfValido) {
      alert("CPF do motorista não encontrado no sistema.");
      return;
    }

    const response = await fetch("http://localhost:8081/usuarios/cadastrarvan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelo: novaVan.modelo,
        placa: novaVan.placa,
        capacidade: Number(novaVan.capacidade),
        bairroInicial: novaVan.bairroInicial,
        destinoFinal: novaVan.destinoFinal,
        horarios: novaVan.horarios,
        turnos: novaVan.turnos,
        preco: Number(novaVan.preco),
        cpf_motorista: novaVan.cpf_motorista,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar van");
    }

    const vanCadastrada = await response.json();
    setVans([...vans, vanCadastrada]);

    setNovaVan({
      modelo: "",
      placa: "",
      capacidade: "",
      bairroInicial: "",
      destinoFinal: "",
      horarios: "",
      turnos: "",
      preco: "",
      cpf_motorista: ""
    });

    setShowModal(false);
  } catch (error) {
    console.error("Erro ao cadastrar van:", error);
    alert("Erro ao cadastrar van: ");
  }
};

useEffect(() => {
  const buscarVans = async () => {
    try {
      const response = await fetch("http://localhost:8081/usuarios/listarvans");
      const data = await response.json();
      setVans(data); // Certifique-se de que o backend retorna todos os campos esperados
    } catch (error) {
      console.error("Erro ao buscar vans:", error);
    }
  };


  buscarVans();
}, []);


useEffect(() => {
  fetch("http://localhost:8081/usuarios/listarMotoristas")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const apenasMotoristas = data.filter(
          (usuario) => usuario.tipoUsuario === "motorista"
        );
        setMotoristas(apenasMotoristas);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar motoristas:", error);
    });
}, []);


useEffect(() => {
  fetch("http://localhost:8081/usuarios/listarResponsaveis")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const somenteResponsaveis = data.filter(
          (usuario) => usuario.tipoUsuario === "responsavel"
        );
        setResponsaveis(somenteResponsaveis);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar responsáveis:", error);
    });
}, []);


useEffect(() => {
  fetch("http://localhost:8081/usuarios/listarvans")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        // Mapeia cada van para um objeto rota
        const rotasFormatadas = data.map((van: any) => ({
          turno: van.turnos,
          origem: van.bairroInicial,
          destino: van.destinoFinal,
          horario: van.horarios,
        }));
        setRotas(rotasFormatadas);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar vans:", error);
    });
}, []);





const handleDeleteVan = async (placa: string) => {
  try {
    const response = await fetch(`http://localhost:8081/usuarios/deletarvan/${placa}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar van");
    }

    setVans(vans.filter((van) => van.placa !== placa));
    setVansExcluidas(vansExcluidas + 1); 
  } catch (error) {
    console.error("Erro ao deletar van:", error);
    alert("Erro ao deletar van.");
  }
};

  const totalVans = vans.length + vansExcluidas;
  const percentualAtivas = totalVans > 0 ? ((vans.length / totalVans) * 100).toFixed(1) : "0";
  const percentualExcluidas = totalVans > 0 ? ((vansExcluidas / totalVans) * 100).toFixed(1) : "0";


  const tableClass = "w-full text-left border-collapse";
  const thClass = "border-b border-gray-300 px-4 py-2 bg-gray-100";
  const tdClass = "border-b border-gray-200 px-4 py-2";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-200 text-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Seja bem vindo (a) ao painel do dono</h1>
        <nav className="flex gap-8">
          {menuItems.map((item) => (
    <Link
      key={item.nome}
      to={item.path}
      className={`hover:underline ${active === item.nome ? "underline font-semibold" : ""}`}
      onClick={() => handleMenuClick(item.nome)}
    >
      {item.nome}
    </Link>
  ))}

        </nav>
      </header>

      <main className="p-8 flex flex-col gap-10">
        {/* Vans */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Vans Cadastradas</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Cadastrar Nova Van
            </button>
          </div>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Modelo</th>
                <th className={thClass}>Placa</th>
                <th className={thClass}>Capacidade</th>
                <th className={thClass}></th>
              </tr>
            </thead>
            <tbody>
              {vans.map((van, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className={tdClass}>{van.modelo}</td>
                  <td className={tdClass}>{van.placa}</td>
                  <td className={tdClass}>{van.capacidade}</td>
                  <td className={tdClass}>
                    <button
                      className="text-red-500 hover:underline text-sm"
                      onClick={() => handleDeleteVan(van.placa)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

                        {}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-2">Vans Ativas</h2>
          <div className="flex items-end gap-8 h-32">
            <div className="flex flex-col items-center">
              <div
                className="bg-blue-600 w-12 rounded-t"
                style={{ height: `${vans.length * 20}px` }}
                title={`Ativas: ${vans.length}`}
              ></div>
              <span className="mt-2 text-sm">
                Ativas<br />
                {vans.length} <span className="text-blue-700 font-bold">({percentualAtivas}%)</span>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="bg-red-500 w-12 rounded-t"
                style={{ height: `${vansExcluidas * 20}px` }}
                title={`Inativas: ${vansExcluidas}`}
              ></div>
              <span className="mt-2 text-sm">
                Inativas<br />
                {vansExcluidas} <span className="text-red-700 font-bold">({percentualExcluidas}%)</span>
              </span>
            </div>
          </div>
        </section>

        {/* Responsáveis */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Passageiros</h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Nome</th>
              </tr>
            </thead>
            <tbody>
              {responsaveis.map((r, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className={tdClass}>{r.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


        {/* Motoristas */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Motoristas</h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Nome</th>
              </tr>
            </thead>
            <tbody>
              {motoristas.map((m, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className={tdClass}>{m.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Rotas</h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Turno</th>
                <th className={thClass}>Origem</th>
                <th className={thClass}>Destino</th>
                <th className={thClass}>Horário</th>
              </tr>
            </thead>
            <tbody>
              {rotas.map((r, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className={tdClass}>{r.turno}</td>
                  <td className={tdClass}>{r.origem}</td>
                  <td className={tdClass}>{r.destino}</td>
                  <td className={tdClass}>{r.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        
      </main>

      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-auto">
        &copy; {new Date().getFullYear()} Wise Vans. Todos os direitos reservados.
      </footer>

      {/* Modal de Cadastro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Cadastrar Nova Van</h2>
            <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-1">
              <input
                className="border p-2 rounded"
                placeholder="Modelo"
                value={novaVan.modelo}
                onChange={(e) => setNovaVan({ ...novaVan, modelo: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Placa"
                value={novaVan.placa}
                onChange={(e) => setNovaVan({ ...novaVan, placa: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Capacidade"
                type="number"
                value={novaVan.capacidade}
                onChange={(e) => setNovaVan({ ...novaVan, capacidade: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Bairro Inicial"
                value={novaVan.bairroInicial}
                onChange={(e) => setNovaVan({ ...novaVan, bairroInicial: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Destino Final"
                value={novaVan.destinoFinal}
                onChange={(e) => setNovaVan({ ...novaVan, destinoFinal: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Horários (ex: 07:00 - 07:45)"
                value={novaVan.horarios}
                onChange={(e) => setNovaVan({ ...novaVan, horarios: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Turnos (ex: Manhã, Tarde)"
                value={novaVan.turnos}
                onChange={(e) => setNovaVan({ ...novaVan, turnos: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Preço"
                type="number"
                value={novaVan.preco}
                onChange={(e) => setNovaVan({ ...novaVan, preco: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="CPF-Motorista"
                value={novaVan.cpf_motorista}
                onChange={(e) => setNovaVan({ ...novaVan, cpf_motorista: e.target.value })}
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddVan}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
