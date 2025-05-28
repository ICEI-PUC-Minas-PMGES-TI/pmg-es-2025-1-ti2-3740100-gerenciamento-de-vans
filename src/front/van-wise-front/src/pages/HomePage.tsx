import React, { useState } from "react";

const menuItems = ["Home", "Mural", "Avaliações", "Rotas"];

const vans = [
  {
    id: 1,
    modelo: "Sprinter 16 lugares",
    placa: "ABC-1234",
    bairroInicial: "Centro",
    destinoFinal: "Bairro das Flores",
    horarios: "07:00 / 12:00 / 18:00",
    turnos: "Manhã / Tarde / Noite",
    preco: "R$ 250,00",
  },
  {
    id: 2,
    modelo: "Fiat Ducato 15 lugares",
    placa: "DEF-5678",
    bairroInicial: "Jardim América",
    destinoFinal: "Centro",
    horarios: "06:30 / 13:00 / 17:30",
    turnos: "Manhã / Tarde / Noite",
    preco: "R$ 230,00",
  },
];

export default function Homepage() {
  const [active, setActive] = useState("Home");
  const [page, setPage] = useState("Home");

  const [selectedVan, setSelectedVan] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    pagamento: "pix",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vanContratada, setVanContratada] = useState<any | null>(null);

  const handleMenuClick = (item: string) => {
    setActive(item);
    setPage(item);
    setSelectedVan(null);
    setShowConfirmModal(false);
  };

  const handleContratarClick = (van: any) => {
    setSelectedVan(van);
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      endereco: "",
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

  const handleSubmit = () => {
    console.log("Contratação enviada:", formData, selectedVan);
    setVanContratada(selectedVan);
    setSelectedVan(null);
    setShowConfirmModal(false);
    alert(`Contratação enviada com sucesso para a van ${selectedVan.modelo}`);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="bg-gray-200 text-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Seja bem-vindo(a)</h1>
        <nav className="flex gap-8">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`hover:underline ${
                active === item ? "underline font-semibold" : ""
              }`}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Van contratada - notificação */}
      {vanContratada && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          <strong>Van contratada!</strong> Modelo: {vanContratada.modelo} | Placa:{" "}
          {vanContratada.placa}
        </div>
      )}

      {/* Página inicial */}
      {page === "Home" && (
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-6">Escolha a sua van</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vans.map((van) => (
              <div
                key={van.id}
                className="bg-white p-4 rounded-lg shadow space-y-1 text-sm"
              >
                <p>
                  <strong>Modelo:</strong> {van.modelo}
                </p>
                <p>
                  <strong>Placa:</strong> {van.placa}
                </p>
                <p>
                  <strong>Bairro Inicial:</strong> {van.bairroInicial}
                </p>
                <p>
                  <strong>Destino Final:</strong> {van.destinoFinal}
                </p>
                <p>
                  <strong>Horários:</strong> {van.horarios}
                </p>
                <p>
                  <strong>Turnos:</strong> {van.turnos}
                </p>
                <p>
                  <strong>Preço:</strong> {van.preco}
                </p>
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

      {/* Outras páginas */}
      {["Mural", "Avaliações", "Rotas"].includes(page) && (
        <div className="p-8 text-center text-gray-500 text-xl">
          A tela <strong>{page}</strong> está em construção.
        </div>
      )}

      {page === "Contratos" && (
        <div className="p-8">
          <ContractForm />
        </div>
      )}

      {/* Modal formulário de contratação */}
      {selectedVan && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedVan(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">
              Contratar: {selectedVan.modelo}
            </h3>
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
                <label className="block text-sm font-medium">Forma de pagamento</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={formData.pagamento}
                  onChange={(e) => handleFormChange("pagamento", e.target.value)}
                >
                  <option value="pix">Pix</option>
                  <option value="cartao">Cartão</option>
                  <option value="boleto">Boleto</option>
                </select>
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

      {/* Modal confirmação final */}
      {showConfirmModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-60 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">Confirme seus dados</h3>
            <p>
              <strong>Van:</strong> {selectedVan?.modelo}
            </p>
            <p>
              <strong>Nome:</strong> {formData.nome}
            </p>
            <p>
              <strong>E-mail:</strong> {formData.email}
            </p>
            <p>
              <strong>Telefone:</strong> {formData.telefone}
            </p>
            <p>
              <strong>Endereço:</strong> {formData.endereco}
            </p>
            <p>
              <strong>Pagamento:</strong> {formData.pagamento}
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCloseConfirmModal}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContractForm() {
  return (
    <div className="text-center text-gray-500 text-xl">
      Formulário de contratos está em construção.
    </div>
  );
}