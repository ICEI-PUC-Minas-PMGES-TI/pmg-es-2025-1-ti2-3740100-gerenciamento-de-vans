import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/button';

interface Usuario {
  idUsuario: number;
  nome: string;
  sobrenome: string;
  tipoUsuario: string;
}

export default function AvaliacaoPage() {
  const [nota, setNota] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [quantidade, setQuantidade] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Exemplo: buscar quantidade de avaliações feitas pelo usuário logado (id fictício)
  useEffect(() => {
    const idUsuario = 1; // Substituir pelo id real do usuário logado
    axios.get(`/avaliacoes/usuario/${idUsuario}`)
      .then(res => setQuantidade(res.data.length))
      .catch(() => setQuantidade(null));
    axios.get('/usuarios/listar')
      .then(res => {
        const user = res.data.find((u: Usuario) => u.idUsuario === idUsuario);
        setUsuario(user || null);
      })
      .catch(() => setUsuario(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    try {
      // Substituir ids conforme contexto real
      await axios.post('/avaliacoes', {
        nota,
        descricao,
        idUsuarioAvaliador: 1, // id do usuário logado
        idMotorista: 2, // id do motorista avaliado
        idViagem: 123 // id da viagem
      });
      setMensagem('Avaliação enviada com sucesso!');
      setNota(0);
      setDescricao('');
    } catch (err) {
      setMensagem('Erro ao enviar avaliação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900 p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow p-10 flex flex-col items-center">
        {/* Header com avatar e nome do responsável */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-5xl mb-2">
            <span role="img" aria-label="avatar">👤</span>
          </div>
          <div className="text-xl font-bold">{usuario ? `${usuario.nome} ${usuario.sobrenome}` : 'Responsável'}</div>
        </div>
        {/* Card de quantidade */}
        <div className="w-full max-w-md bg-gray-100 dark:bg-zinc-800 rounded-lg p-6 flex flex-col items-center mb-8">
          <div className="text-lg font-semibold mb-2">Quantidades de avaliação feitas</div>
          <div className="text-4xl font-bold">{quantidade !== null ? quantidade : '...'}</div>
        </div>
        {/* Área de avaliação */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6 items-center">
          <div className="w-full">
            <label className="block mb-2 font-medium text-center">AVALIAÇÃO</label>
            <div className="flex justify-center"><StarRating value={nota} onChange={setNota} /></div>
          </div>
          <div className="w-full">
            <textarea
              className="w-full border rounded p-2 min-h-[80px]"
              placeholder="Descreva sobre a sua experiência"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading || nota === 0}>
            {loading ? 'Enviando...' : 'Enviar avaliação'}
          </Button>
          {mensagem && <div className="text-center text-sm mt-2">{mensagem}</div>}
        </form>
      </div>
    </main>
  );
} 