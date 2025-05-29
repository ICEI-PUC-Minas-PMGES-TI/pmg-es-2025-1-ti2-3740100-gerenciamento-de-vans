import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/button';

interface Avaliacao {
  id: number;
  nota: number;
  descricao: string;
  idUsuarioAvaliador: number;
}

interface Usuario {
  idUsuario: number;
  nome: string;
  sobrenome: string;
  tipoUsuario: string;
}

function exportToCSV(avaliacoes: Avaliacao[], usuarios: Record<number, Usuario>) {
  const header = 'Nome,Nota,Descrição\n';
  const rows = avaliacoes.map(a => {
    const user = usuarios[a.idUsuarioAvaliador];
    const nome = user ? `${user.nome} ${user.sobrenome}` : 'Desconhecido';
    return `${nome},${a.nota},"${a.descricao.replace(/"/g, '""')}"`;
  });
  const csv = header + rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'relatorio_avaliacoes.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function GestaoAvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [usuarios, setUsuarios] = useState<Record<number, Usuario>>({});
  const [quantidade, setQuantidade] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idMotorista = 2; // Substituir pelo id real do dono da rede
    Promise.all([
      axios.get(`/avaliacoes/motorista/${idMotorista}`),
      axios.get('/usuarios/listar')
    ])
      .then(([avRes, usRes]) => {
        setAvaliacoes(avRes.data);
        setQuantidade(avRes.data.length);
        const userMap: Record<number, Usuario> = {};
        usRes.data.forEach((u: Usuario) => {
          userMap[u.idUsuario] = u;
        });
        setUsuarios(userMap);
      })
      .catch(() => {
        setAvaliacoes([]);
        setUsuarios({});
        setQuantidade(0);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900 p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-lg shadow p-10 flex flex-col items-center">
        {/* Header com avatar e nome do dono */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-5xl mb-2">
            <span role="img" aria-label="avatar">👤</span>
          </div>
          <div className="text-xl font-bold">Nome Dono</div>
        </div>
        {/* Card de quantidade */}
        <div className="w-full max-w-md bg-gray-100 dark:bg-zinc-800 rounded-lg p-6 flex flex-col items-center mb-8">
          <div className="text-lg font-semibold mb-2">Quantidades de avaliação</div>
          <div className="text-4xl font-bold">{quantidade}</div>
        </div>
        {/* Lista de avaliações */}
        <div className="w-full max-w-2xl mb-8">
          <div className="font-semibold mb-4 text-center">AVALIAÇÃO</div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center">Carregando...</div>
            ) : (
              avaliacoes.map((a) => {
                const user = usuarios[a.idUsuarioAvaliador];
                const nome = user ? `${user.nome} ${user.sobrenome}` : 'Desconhecido';
                return (
                  <div key={a.id} className="flex items-center gap-4 border-b pb-2">
                    <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center text-lg font-bold">
                      <span>👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{nome}</span>
                        <StarRating value={a.nota} onChange={() => {}} />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{a.descricao}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <Button className="w-full max-w-md" onClick={() => exportToCSV(avaliacoes, usuarios)} disabled={avaliacoes.length === 0}>
          Baixar relatório de avaliação
        </Button>
      </div>
    </main>
  );
} 