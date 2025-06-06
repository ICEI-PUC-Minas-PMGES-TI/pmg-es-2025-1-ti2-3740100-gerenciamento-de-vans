import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

interface Motorista {
  id: number;
  nome: string;
  fotoUrl?: string;
}

const AvaliarMotoristaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [qtdAvaliacoesMotorista, setQtdAvaliacoesMotorista] = useState(0);
  const navigate = useNavigate();

  // Simulação de quantidade de avaliações feitas
  const qtdAvaliacoes = 100;

  useEffect(() => {
    fetch(`http://localhost:8081/api/motoristas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMotorista(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (motorista) {
      fetch(`http://localhost:8081/api/avaliacoes/count/motorista/${motorista.id}`)
        .then(res => res.json())
        .then(data => setQtdAvaliacoesMotorista(data));
    }
  }, [motorista]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('Enviando sua avaliação, aguarde um instante...');
    setEnviando(true);
    await fetch('http://localhost:8081/api/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        motoristaId: motorista?.id,
        estrelas: rating,
        comentario,
      }),
    });
    setEnviando(false);
    setMensagem('');
    navigate('/avaliacao-motoristas');
  };

  if (loading) return <div className="text-center mt-10">Carregando motorista...</div>;
  if (!motorista) return <div className="text-center mt-10">Motorista não encontrado.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Painel superior */}
      <Card className="flex items-center gap-6 mb-8 p-6">
        <img src={motorista.fotoUrl || 'https://via.placeholder.com/64'} alt="avatar motorista" className="rounded-full w-16 h-16" />
        <div>
          <div className="text-lg font-semibold">{motorista.nome}</div>
          <div className="text-gray-500">Avaliações recebidas</div>
          <div className="text-3xl font-bold">{qtdAvaliacoesMotorista}</div>
        </div>
      </Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold">AVALIAÇÃO</span>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <textarea
          className="border rounded-md p-3 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Descreva sobre a sua experiência"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
        />
        {mensagem && (
          <div className="text-center text-blue-600 font-medium animate-pulse">{mensagem}</div>
        )}
        <Button type="submit" className="w-full h-12 text-lg" disabled={enviando || rating === 0}>
          {enviando ? 'Enviando...' : 'Enviar avaliação'}
        </Button>
      </form>
    </div>
  );
};

export default AvaliarMotoristaPage; 