import React, { useEffect, useState } from "react";
import axios from "axios";

const menuItems = ["Home", "Mural", "Avaliações", "Rotas"];

type Van = {
  id: number;
  modelo: string;
  placa: string;
  bairroInicial: string;
  destinoFinal: string;
  horarios: string;
  turnos: string;
  preco: string;
};

// Simulação de usuário logado (ajuste conforme necessário)
const ID_PASSAGEIRO = 1;

// Tipos para viagens e avaliações
interface Viagem {
  id: number;
  idMotorista: number;
  data: string;
  checkOut: boolean;
}
interface Avaliacao {
  idViagem: number;
  nota: number;
  comentario: string;
  dataAvaliacao: string;
}

export default function Homepage() {
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [active, setActive] = useState("Home");
  const [page, setPage] = useState("Home");

  const [selectedVan, setSelectedVan] = useState<Van | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    entrada: "",
    saida: "",
    turno: "",
    pagamento: "pix",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vanContratada, setVanContratada] = useState<Van | null>(null);

  // Estado para avaliações pendentes
  const [viagensPendentes, setViagensPendentes] = useState<Viagem[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [showAvaliacaoNotif, setShowAvaliacaoNotif] = useState(false);

  useEffect(() => {
    axios
      .get<Van[]>("http://localhost:8081/usuarios/listarvans")
      .then((res) => {
        setVans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao buscar as vans");
        setLoading(false);
      });
  }, []);

  // Buscar viagens concluídas (checkOut true) do passageiro
  useEffect(() => {
    fetch(`http://localhost:8081/api/viagens?passageiro=${ID_PASSAGEIRO}`)
      .then((res) => res.json())
      .then((todasViagens: Viagem[]) => {
        // Filtrar apenas concluídas
        const concluidas = todasViagens.filter(v => v.checkOut);
        setViagensPendentes(concluidas);
      })
      .catch(() => setViagensPendentes([]));
  }, []);

  // Buscar avaliações já feitas
  useEffect(() => {
    fetch(`http://localhost:8081/api/avaliacoes/por-passageiro/${ID_PASSAGEIRO}`)
      .then((res) => res.json())
      .then((avaliacoes: Avaliacao[]) => setAvaliacoes(avaliacoes))
      .catch(() => setAvaliacoes([]));
  }, []);

  // Atualizar notificação de avaliações pendentes
  useEffect(() => {
    // Viagens concluídas que ainda não foram avaliadas
    const idsAvaliadas = new Set(avaliacoes.map(a => a.idViagem));
    const pendentes = viagensPendentes.filter(v => !idsAvaliadas.has(v.id));
    setShowAvaliacaoNotif(pendentes.length >= 5);
  }, [viagensPendentes, avaliacoes]);

  const handleMenuClick = (item: string) => {
    setActive(item);
    setPage(item);
    setSelectedVan(null);
    setShowConfirmModal(false);
  };

  const handleContratarClick = (van: Van) => {
    setSelectedVan(van);
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      endereco: "",
      entrada: "",
      saida: "",
      turno: "",
      pagamento: "pix",
    });
    setShowConfirmModal(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenConfirmModal = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8081/usuarios/contratar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          endereco: formData.endereco,
          entrada: formData.entrada,
          saida: formData.saida,
          turno: formData.turno.toUpperCase(),
          formaPagamento: "PIX",
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Erro ao contratar van.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Se não for JSON, mantém a mensagem padrão
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setVanContratada(selectedVan);
      setSelectedVan(null);
      setShowConfirmModal(false);
      alert(`Contratação enviada com sucesso para a van ${selectedVan?.modelo}`);
    } catch (error: any) {
      console.error("Erro ao contratar:", error);
      alert("Erro ao contratar van: " + error.message);
    }
  };

  // Redirecionar para avaliações ao clicar na notificação
  const handleNotifClick = () => {
    window.location.href = '/avaliacoes';
  };

  return (
  <div className="min-h-screen flex flex-col relative">
    <div className="px-6 py-4 flex justify-between items-center text-center ">
      <h1 className="text-xl font-bold">Seja bem-vindo(a)</h1>
    </div>

      {/* Van contratada - notificação */}
      {vanContratada && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          <strong>Van contratada!</strong> Modelo: {vanContratada.modelo} | Placa:{" "}
          {vanContratada.placa}
        </div>
      )}

      {/* Notificação permanente de avaliações pendentes */}
      {showAvaliacaoNotif && (
        <div
          className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded shadow-lg z-50 cursor-pointer animate-bounce"
          onClick={handleNotifClick}
        >
          <strong>Atenção:</strong> Você possui 5 ou mais viagens concluídas sem avaliação!<br/>
          Clique aqui para avaliar e remover esta notificação.
        </div>
      )}

    {page === "Home" && (
      <main className="p-8">
        <h2 className="text-3xl font-bold mb-6">Escolha a sua van</h2>
        {loading && <p>Carregando vans...</p>}
        {erro && <p className="text-red-500">{erro}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vans.map((van) => (
            <div
              key={van.id}
              className="bg-white p-4 rounded-lg shadow space-y-1 text-sm"
            >
              <p><strong>Modelo:</strong> {van.modelo}</p>
              <p><strong>Placa:</strong> {van.placa}</p>
              <p><strong>Bairro Inicial:</strong> {van.bairroInicial}</p>
              <p><strong>Destino Final:</strong> {van.destinoFinal}</p>
              <p><strong>Horários:</strong> {van.horarios}</p>
              <p><strong>Turnos:</strong> {van.turnos}</p>
              <p><strong>Preço:</strong> {van.preco}</p>
              <button
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                onClick={() => handleContratarClick(van)}
              >
                Quero contratar
              </button>
            </div>
          ))}
        </div>
      </main>
    )}

    {["Mural", "Avaliações", "Rotas"].includes(page) && (
      <div className="p-8 text-center text-gray-500 text-xl">
        A tela <strong>{page}</strong> está em construção.
      </div>
    )}

    {selectedVan && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-30">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]">
          <button
            onClick={() => setSelectedVan(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">Contratar: {selectedVan.modelo}</h3>
          <form onSubmit={handleOpenConfirmModal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                required
                className="w-full border px-3 py-2 rounded"
                value={formData.nome}
                onChange={(e) => handleFormChange("nome", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">E-mail</label>
              <input
                type="email"
                required
                className="w-full border px-3 py-2 rounded"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Telefone</label>
              <input
                type="tel"
                required
                className="w-full border px-3 py-2 rounded"
                value={formData.telefone}
                onChange={(e) => handleFormChange("telefone", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Endereço</label>
              <input
                type="text"
                required
                className="w-full border px-3 py-2 rounded"
                value={formData.endereco}
                onChange={(e) => handleFormChange("endereco", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Horário de entrada</label>
              <input
                type="time"
                required
                className="w-full border px-3 py-2 rounded"
                value={formData.entrada}
                onChange={(e) => handleFormChange("entrada", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Horário de saída</label>
              <input
                type="time"
                required
                className="w-full border px-3 py-2 rounded"
                value={formData.saida}
                onChange={(e) => handleFormChange("saida", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Turno</label>
              <select
                required
                className="w-full border px-3 py-2 rounded"
                value={formData.turno}
                onChange={(e) => handleFormChange("turno", e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="MANHA">MANHA</option>
                <option value="TARDE">TARDE</option>
                <option value="NOITE">NOITE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Forma de pagamento</label>
              <input
                type="text"
                readOnly
                className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
                value="Pix"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Confirmar Contratação
            </button>
          </form>
        </div>
      </div>
    )}

    {showConfirmModal && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-60 bg-black bg-opacity-30">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center overflow-y-auto max-h-[90vh]">
          <h3 className="text-xl font-bold mb-4">Confirme seus dados</h3>
          <p><strong>Van:</strong> {selectedVan?.modelo}</p>
          <p><strong>Nome:</strong> {formData.nome}</p>
          <p><strong>E-mail:</strong> {formData.email}</p>
          <p><strong>Telefone:</strong> {formData.telefone}</p>
          <p><strong>Endereço:</strong> {formData.endereco}</p>
          <p><strong>Entrada:</strong> {formData.entrada}</p>
          <p><strong>Saída:</strong> {formData.saida}</p>
          <p><strong>Turno:</strong> {formData.turno}</p>
          <p><strong>Pagamento:</strong> Pix</p>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleCloseConfirmModal}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Voltar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}



