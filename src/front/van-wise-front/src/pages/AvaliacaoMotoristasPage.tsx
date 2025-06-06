import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

interface Motorista {
  id: number;
  nome: string;
  fotoUrl?: string;
}

const AvaliacaoMotoristasPage: React.FC = () => {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(true);
  const [qtdAvaliacoes, setQtdAvaliacoes] = useState(0);
  const [avaliacoesPorMotorista, setAvaliacoesPorMotorista] = useState<{[id: number]: number}>({});
  const navigate = useNavigate();
  const location = useLocation();

  // Simulação de dono e quantidade de avaliações
  const nomeDono = 'Nome Dono';

  useEffect(() => {
    fetch('http://localhost:8081/api/motoristas')
      .then((res) => res.json())
      .then((data) => {
        setMotoristas(data);
        setLoading(false);
        // Para cada motorista, buscar o total de avaliações
        data.forEach((m: Motorista) => {
          fetch(`http://localhost:8081/api/avaliacoes/count/motorista/${m.id}`)
            .then(res => res.json())
            .then(count => setAvaliacoesPorMotorista(prev => ({ ...prev, [m.id]: count })));
        });
      });
  }, []);

  // Atualiza o total de avaliações sempre que a página for exibida novamente
  useEffect(() => {
    fetch('http://localhost:8081/api/avaliacoes/count')
      .then(res => res.json())
      .then(data => setQtdAvaliacoes(data));
  }, [location]);

  if (loading) return <div className="text-center mt-10">Carregando motoristas...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Painel superior */}
      <Card className="flex items-center gap-6 mb-8 p-6">
        <img src="https://via.placeholder.com/64" alt="avatar dono" className="rounded-full w-16 h-16" />
        <div>
          <div className="text-lg font-semibold">{nomeDono}</div>
          <div className="text-gray-500">Quantidades de avaliação</div>
          <div className="text-3xl font-bold">{qtdAvaliacoes}</div>
        </div>
      </Card>
      <h2 className="text-xl font-bold mb-4">AVALIAÇÃO</h2>
      <div className="flex flex-col gap-4">
        {motoristas.map((motorista) => (
          <Card key={motorista.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <img src={motorista.fotoUrl || 'https://via.placeholder.com/48'} alt={motorista.nome} className="rounded-full w-12 h-12" />
              <span className="font-medium">{motorista.nome}</span>
              <span className="ml-2 text-gray-500 text-sm">{avaliacoesPorMotorista[motorista.id] ?? 0} avaliações</span>
            </div>
            <Button onClick={() => navigate(`/avaliar-motorista/${motorista.id}`)} className="ml-4">Avaliar</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvaliacaoMotoristasPage; 