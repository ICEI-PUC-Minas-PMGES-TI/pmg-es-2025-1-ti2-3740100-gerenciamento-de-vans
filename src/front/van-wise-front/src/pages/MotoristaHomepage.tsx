import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

const AvaliacaoGeral = () => {
  const mediaAvaliacao = 4.2;

  const renderEstrelas = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        fill={i < Math.floor(mediaAvaliacao) ? "#facc15" : "none"}
        stroke="#facc15"
        className="w-6 h-6"
      />
    ));
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-md w-1/2">
      <h2 className="text-xl font-bold mb-4">Avaliação dos Passageiros</h2>
      <div className="flex items-center gap-2">
        {renderEstrelas()}
        <span className="text-lg font-semibold text-gray-700">
          {mediaAvaliacao.toFixed(1)}/5
        </span>
      </div>
    </section>
  );
};

const horariosTurnos = [
  { turno: "Manhã", inicio: "6:00", fim: "8:00" },
  { turno: "Tarde", inicio: "10:30", fim: "13:30" },
  { turno: "Noite", inicio: "17:00", fim: "19:30" },
];

const VanInfo = ({ van }: { van: Van | null }) => {
  if (!van) return <p>Carregando...</p>;

  return (
    <>
      <p>
        <strong>Placa:</strong> {van.placa}
      </p>
      <p>
        <strong>Modelo:</strong> {van.modelo}
      </p>
      <p>
        <strong>Capacidade:</strong> {van.capacidade} passageiros
      </p>
      <p>
        <strong>CPF:</strong> {van.cpf_motorista}
      </p>
    </>
  );
};

type Van = {
  placa: string;
  modelo: string;
  capacidade: number;
  cpf_motorista: string;
};

type Usuario = {
  nome: string;
  tipoUsuario: string; // para filtrar responsáveis
};

export default function MotoristaHomepage() {
  const [active, setActive] = useState("Rota");
  const [modalVanOpen, setModalVanOpen] = useState(false);
  const [modalHorarioOpen, setModalHorarioOpen] = useState(false);
  const [vanResponsavel, setVanResponsavel] = useState<Van | null>(null);
  const [passageiros, setPassageiros] = useState<Usuario[]>([]);
  


  useEffect(() => {
    fetch("http://localhost:8081/usuarios/listarvans")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVanResponsavel(data[0]); // Exibe a primeira van
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar vans:", error);
      });

    // Buscar usuários responsáveis (tipoUsuario === "responsavel")
    fetch("http://localhost:8081/usuarios/listarResponsaveis")
      .then((res) => res.json())
      .then((data: Usuario[]) => {
        if (Array.isArray(data)) {
          const responsaveis = data.filter(
            (usuario) => usuario.tipoUsuario === "responsavel"
          );
          setPassageiros(responsaveis);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
        <div className="px-6 py-4 flex justify-between items-center text-center ">
      <h1 className="text-xl font-bold">Seja bem-vindo(a)</h1>
        </div>
        
      <main className="p-8 flex flex-col gap-10 flex-grow">
        <div className="flex gap-6">
          <section className="bg-white p-4 rounded-xl shadow-md w-72 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">Sua Van</h2>
              <VanInfo van={vanResponsavel} />
            </div>
            <button
              onClick={() => setModalVanOpen(true)}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition"
            >
              Ver detalhes
            </button>
          </section>

          <section className="bg-white p-4 rounded-xl shadow-md w-72 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">Horários e Turnos</h2>
              <p>
                <strong>Turnos:</strong> {horariosTurnos.map((h) => h.turno).join(", ")}
              </p>
            </div>
            <button
              onClick={() => setModalHorarioOpen(true)}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition"
            >
              Ver detalhes
            </button>
          </section>
        </div>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Passageiros da Van</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Nome</th>
                </tr>
              </thead>
              <tbody>
                {passageiros.map((p, i) => (
                  <tr key={i} className="text-center">
                    <td className="p-2 border">{p.nome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AvaliacaoGeral />
      </main>

      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-auto">
        &copy; {new Date().getFullYear()} Wise Vans. Todos os direitos reservados.
      </footer>

      {modalVanOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="bg-white rounded-xl p-8 w-96 max-w-full shadow-lg relative pointer-events-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={() => setModalVanOpen(false)}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6">Detalhes da Van</h2>
            <VanInfo van={vanResponsavel} />
          </div>
        </div>
      )}

      {modalHorarioOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="bg-white rounded-xl p-8 w-80 max-w-full shadow-lg relative pointer-events-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={() => setModalHorarioOpen(false)}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6">Detalhes dos Turnos</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b pb-2">Turno</th>
                  <th className="border-b pb-2">Início</th>
                  <th className="border-b pb-2">Fim</th>
                </tr>
              </thead>
              <tbody>
                {horariosTurnos.map(({ turno, inicio, fim }, i) => (
                  <tr key={i}>
                    <td className="py-1">{turno}</td>
                    <td className="py-1">{inicio}</td>
                    <td className="py-1">{fim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


