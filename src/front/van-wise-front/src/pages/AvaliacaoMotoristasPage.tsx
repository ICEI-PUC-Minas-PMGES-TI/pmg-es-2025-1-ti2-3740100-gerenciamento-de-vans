import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import StarRating from '../components/StarRating';
import { toast } from 'sonner';

interface Motorista {
  id: number;
  nome: string;
  mediaAvaliacao: number;
  totalAvaliacoes: number;
}

const AvaliacaoMotoristasPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');

  const carregarMotoristas = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/motoristas');
      const data = await response.json();
      
      // Buscar estatísticas de avaliação para cada motorista
      const motoristasComAvaliacoes = await Promise.all(
        data.map(async (motorista: Motorista) => {
          const statsRes = await fetch(`http://localhost:8081/api/avaliacoes/motorista/${motorista.id}/estatisticas`);
          const stats = await statsRes.json();
          return {
            ...motorista,
            mediaAvaliacao: stats.media,
            totalAvaliacoes: stats.total
          };
        })
      );
      setMotoristas(motoristasComAvaliacoes);
    } catch (error) {
      console.error('Erro ao carregar motoristas:', error);
      toast.error('Erro ao carregar lista de motoristas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.error('Você precisa estar logado para acessar esta página');
      navigate('/login');
      return;
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }

    carregarMotoristas();
  }, [navigate, location]); // Adicionado location como dependência para recarregar quando voltar da avaliação

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Avaliação de Motoristas</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Bem-vindo(a),</p>
          <p className="font-semibold">{userName}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {motoristas.map((motorista) => (
          <Card key={motorista.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{motorista.nome}</h2>
                <div className="flex items-center gap-2">
                  <StarRating value={motorista.mediaAvaliacao} readonly />
                  <span className="text-sm text-gray-600">
                    ({motorista.totalAvaliacoes} avaliações)
                  </span>
                </div>
              </div>
              <Button
                onClick={() => navigate(`/avaliar-motorista/${motorista.id}`)}
              >
                Avaliar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvaliacaoMotoristasPage; 