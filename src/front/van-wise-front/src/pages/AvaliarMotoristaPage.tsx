import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

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
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081/api/motoristas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMotorista(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    await fetch('/api/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        motoristaId: id,
        estrelas: rating,
        comentario,
      }),
    });
    setEnviando(false);
    alert('Avaliação enviada com sucesso!');
    navigate('/avaliacao-motoristas');
  };

  if (loading) return <div>Carregando motorista...</div>;
  if (!motorista) return <div>Motorista não encontrado.</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Avaliar Motorista</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <img
          src={motorista.fotoUrl || 'https://via.placeholder.com/64'}
          alt={motorista.nome}
          style={{ width: 64, height: 64, borderRadius: '50%', marginRight: 16 }}
        />
        <span style={{ fontSize: 20 }}>{motorista.nome}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>Avaliação</label>
        <StarRating value={rating} onChange={setRating} />
        <textarea
          placeholder="Deixe um comentário (opcional)"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          style={{ width: '100%', minHeight: 80, marginTop: 16, marginBottom: 16 }}
        />
        <button type="submit" disabled={enviando || rating === 0}>
          {enviando ? 'Enviando...' : 'Enviar avaliação'}
        </button>
      </form>
    </div>
  );
};

export default AvaliarMotoristaPage; 