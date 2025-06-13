import React, { useEffect, useState } from "react";


const ID_PASSAGEIRO = 1;


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

interface AvaliacaoComViagem {
  id: number;
  idViagem: number;
  nota: number;
  comentario: string;
  dataAvaliacao: string;
  viagem?: Viagem;
}

export default function AvaliacaoPage() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [avaliando, setAvaliando] = useState<Viagem | null>(null);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoComViagem[]>([]);

  // Buscar viagens elegíveis para avaliação (checkOut true, data de hoje)
  useEffect(() => {
    fetch(`http://localhost:8081/api/viagens?passageiro=${ID_PASSAGEIRO}`)
      .then((res) => res.json())
      .then(setViagens)
      .catch(() => setViagens([]));
  }, []);

  // Buscar avaliações já feitas pelo usuário logado
  useEffect(() => {
    fetch(`http://localhost:8081/api/avaliacoes/por-passageiro/${ID_PASSAGEIRO}`)
      .then((res) => res.json())
      .then(setAvaliacoes)
      .catch(() => setAvaliacoes([]));
  }, []);

  const handleAvaliar = (viagem: Viagem) => {
    setAvaliando(viagem);
    setNota(0);
    setComentario("");
    setMensagem("");
  };

  const handleEnviar = async () => {
    if (!avaliando || nota < 1 || nota > 5) {
      setMensagem("Selecione uma nota de 1 a 5 estrelas.");
      return;
    }
    const hoje = new Date().toISOString().slice(0, 10);
    const avaliacao: Avaliacao = {
      idViagem: avaliando.id,
      nota,
      comentario,
      dataAvaliacao: avaliando.data,
    };
    const resp = await fetch("http://localhost:8081/api/avaliacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(avaliacao),
    });
    if (resp.ok) {
      setMensagem("Avaliação enviada com sucesso!");
      setAvaliando(null);
      // Atualiza lista de avaliações para mostrar "Avaliado" para todas as viagens da data
      setAvaliacoes((prev) => [
        ...prev,
        { ...avaliacao, id: Math.random() }
      ]);
    } else {
      setAvaliando(null);
    }
  };

  // Função para formatar data como dd/MM/AAAA
  function formatarDataBR(data: string) {
    return data.split('-').reverse().join('/');
  }

  // Agrupar viagens por data e exibir apenas uma por data
  const viagensPorData: { [data: string]: Viagem } = {};
  viagens.forEach((viagem) => {
    // Só adiciona se ainda não existe viagem para essa data
    if (!viagensPorData[viagem.data]) {
      viagensPorData[viagem.data] = viagem;
    }
  });
  // Lista de viagens únicas por data
  const viagensUnicas = Object.values(viagensPorData);

  // Filtrar viagens para exibir apenas as com data <= hoje
  const hojeDate = new Date();
  const viagensFiltradas = viagensUnicas.filter((viagem) => {
    const dataViagem = new Date(viagem.data);
    // Zera hora para comparar só a data
    dataViagem.setHours(0,0,0,0);
    hojeDate.setHours(0,0,0,0);
    return dataViagem <= hojeDate;
  });

  // Agrupar avaliações por data
  const datasAvaliadas = new Set(avaliacoes.map(a => a.dataAvaliacao));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6">Avaliação de Motoristas</h2>
        {mensagem && (
          <div className="mb-4 text-center text-green-600 font-semibold">{mensagem}</div>
        )}
        {/* Avaliações já feitas */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Suas avaliações recentes</h3>
          {avaliacoes.length === 0 ? (
            <div className="text-gray-500 text-sm">Nenhuma avaliação feita ainda.</div>
          ) : (
            <div className="flex flex-col gap-2">
              {avaliacoes.map((a) => (
                <div key={a.id} className="border rounded-lg p-3 flex flex-col gap-1 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Viagem:</span> {a.idViagem}
                    <span className="font-semibold ml-4">Nota:</span>
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className={`text-lg ${star <= a.nota ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Comentário: {a.comentario || <span className="italic text-gray-400">(sem comentário)</span>}</div>
                  <div className="text-xs text-gray-400">Data: {formatarDataBR(a.dataAvaliacao)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {avaliando ? (
          <div>
            <div className="mb-4">
              <strong>Motorista:</strong> {avaliando.idMotorista}
            </div>
            <div className="mb-4">
              <strong>Data da Avaliação:</strong> {formatarDataBR(avaliando.data)}
            </div>
            <div className="mb-4">
              <strong>Avaliação:</strong>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl cursor-pointer ${star <= nota ? "text-yellow-400" : "text-gray-400"}`}
                    onClick={() => setNota(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <strong>Comentário</strong>
              <textarea
                className="w-full border rounded px-3 py-2 mt-2"
                placeholder="Digite seu comentário sobre o motorista..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={handleEnviar}
              >
                Enviar Avaliação
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setAvaliando(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            {viagensFiltradas.length === 0 ? (
              <div className="text-center text-gray-500">Nenhuma viagem elegível para avaliação hoje.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {viagensFiltradas.map((viagem) => {
                  // Verifica se já existe avaliação para essa data
                  const jaAvaliada = datasAvaliadas.has(viagem.data);
                  return (
                    <div
                      key={viagem.data}
                      className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
                    >
                      <div>
                        <div className="font-semibold">Motorista: {viagem.idMotorista}</div>
                        <div className="text-sm text-gray-500">Data: {formatarDataBR(viagem.data)}</div>
                      </div>
                      {!jaAvaliada && (
                        <button
                          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                          onClick={() => handleAvaliar(viagem)}
                        >
                          Avaliar
                        </button>
                      )}
                      {jaAvaliada && (
                        <button
                          className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                          disabled
                        >
                          Avaliado
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 