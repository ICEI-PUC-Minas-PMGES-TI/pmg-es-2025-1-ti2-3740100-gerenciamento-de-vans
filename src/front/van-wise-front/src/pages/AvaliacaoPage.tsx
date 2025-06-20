import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { getUser, User } from "@/auth";




interface Viagem {
  id: number;
  idMotorista: number;
  data: string;
}

interface Avaliacao {
  idViagem: number;
  idPassageiro: number;
  nota: number;
  comentario: string;
  dataAvaliacao: string;
  dataLimite: string;
}

interface AvaliacaoComViagem {
  id: number;
  idViagem: number;
  idPassageiro: number;
  nota: number;
  comentario: string;
  dataAvaliacao: string;
  dataLimite: string;
  viagem?: Viagem;
}

export default function AvaliacaoPage() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [avaliando, setAvaliando] = useState<Viagem | null>(null);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoComViagem[]>([]);
  const [erro, setErro] = useState("");
  const user = getUser();
  const idPassageiro = user?.idUsuario;



  // Buscar viagens elegíveis para avaliação
  useEffect(() => {
    fetch(`http://localhost:8081/api/viagens/elegiveis?idPassageiro=${idPassageiro}&data=${new Date().toISOString().split('T')[0]}`)
      .then((res) => res.json())
      .then(setViagens)
      .catch(() => setViagens([]));
  }, [idPassageiro]);

  // Buscar avaliações já feitas pelo usuário logado
  useEffect(() => {
    if (!idPassageiro) return;

    fetch(`http://localhost:8081/api/avaliacoes/por-passageiro/${idPassageiro}`)
      .then((res) => res.json())
      .then(setAvaliacoes)
      .catch(() => setAvaliacoes([]));
  }, [idPassageiro]);
  
  const handleAvaliar = (viagem: Viagem) => {
    setAvaliando(viagem);
    setNota(0);
    setComentario("");
    setMensagem("");
    setErro("");
  };

    const handleEnviar = async () => {
    if (!avaliando || !idPassageiro) return;

    // 5. Usar o ID REAL ao enviar a avaliação
    const avaliacao = {
      idViagem: avaliando.id,
      idPassageiro: idPassageiro,
      nota,
      comentario,
    };

    try {
      const response = await fetch('http://localhost:8081/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(avaliacao),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar avaliação.');
      }

      setMensagem("Avaliação enviada com sucesso!");
      setAvaliando(null); // Fecha o formulário
      // Atualiza a lista de avaliações e viagens elegíveis
      fetch(`http://localhost:8081/api/avaliacoes/por-passageiro/${idPassageiro}`).then(res => res.json()).then(setAvaliacoes);
      fetch(`http://localhost:8081/api/viagens/elegiveis?idPassageiro=${idPassageiro}&data=${new Date().toISOString().split('T')[0]}`).then(res => res.json()).then(setViagens);

    } catch (error: any) {
      setErro(error.message);
    }
  };

  // Função para formatar data como dd/MM/AAAA
  function formatarDataBR(data: string) {
    return data.split('-').reverse().join('/');
  }

  // Função para verificar se a avaliação está expirada
  function isAvaliacaoExpirada(dataViagem: string) {
    const dataViagemObj = new Date(dataViagem);
    const dataLimite = new Date(dataViagemObj.getTime() + 3 * 24 * 60 * 60 * 1000);
    return new Date() > dataLimite;
  }

  // Função para verificar se pode avaliar (últimos 15 dias)
  function podeAvaliar() {
    const ultimaAvaliacao = avaliacoes[avaliacoes.length - 1];
    if (!ultimaAvaliacao) return true;
    
    const dataUltimaAvaliacao = new Date(ultimaAvaliacao.dataAvaliacao);
    const dataLimite = new Date(dataUltimaAvaliacao.getTime() + 15 * 24 * 60 * 60 * 1000);
    return new Date() > dataLimite;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6">Avaliação de Motoristas</h2>
        {mensagem && (
          <div className="mb-4 text-center text-green-600 font-semibold">{mensagem}</div>
        )}
        {erro && (
          <div className="mb-4 text-center text-red-600 font-semibold">{erro}</div>
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
            {viagens.length === 0 ? (
              <div className="text-center text-gray-500">Nenhuma viagem elegível para avaliação hoje.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {viagens.map((viagem) => {
                  const jaAvaliada = avaliacoes.some(a => a.idViagem === viagem.id);
                  const expirada = isAvaliacaoExpirada(viagem.data);
                  const podeAvaliarHoje = podeAvaliar();

                  return (
                    <div
                      key={viagem.id}
                      className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
                    >
                      <div>
                        <div className="font-semibold">Motorista: {viagem.idMotorista}</div>
                        <div className="text-sm text-gray-500">Data: {formatarDataBR(viagem.data)}</div>
                      </div>
                      {!jaAvaliada && !expirada && podeAvaliarHoje && (
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
                      {expirada && !jaAvaliada && (
                        <button
                          className="px-4 py-2 bg-red-400 text-white rounded cursor-not-allowed"
                          disabled
                        >
                          Expirado
                        </button>
                      )}
                      {!podeAvaliarHoje && !jaAvaliada && !expirada && (
                        <button
                          className="px-4 py-2 bg-yellow-400 text-white rounded cursor-not-allowed"
                          disabled
                        >
                          Aguarde 15 dias
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