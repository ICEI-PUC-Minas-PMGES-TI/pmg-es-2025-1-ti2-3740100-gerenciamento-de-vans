import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import StarRating from '../components/StarRating';
import { toast } from 'sonner';

interface Motorista {
  id: number;
  nome: string;
}

const AvaliarMotoristaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [motorista, setMotorista] = useState<Motorista | null>(null);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const dataAvaliacao = new Date().toLocaleDateString('pt-BR');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    console.log('Dados do usuário:', { token, storedUserName, userId });

    if (!token || !userId) {
      toast.error('Você precisa estar logado para acessar esta página');
      navigate('/login');
      return;
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Buscar dados do motorista
    fetch(`http://localhost:8081/api/motoristas/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Dados do motorista:', data);
        setMotorista(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do motorista:', error);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nota === 0) {
      toast.error('Por favor, selecione uma nota');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Você precisa estar logado para enviar uma avaliação');
      navigate('/login');
      return;
    }

    try {
      const motoristaId = Number(id);
      const usuarioId = Number(userId);

      console.log('IDs convertidos:', { motoristaId, usuarioId });

      const avaliacaoData = {
        motoristaId: motoristaId,
        usuarioId: usuarioId,
        nota: nota,
        comentario: comentario
      };

      console.log('Enviando avaliação:', avaliacaoData);

      const response = await fetch('http://localhost:8081/api/avaliacoes', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacaoData),
    });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (response.ok) {
        toast.success('Avaliação enviada com sucesso!');
    navigate('/avaliacao-motoristas');
      } else {
        toast.error(data.message || 'Erro ao enviar avaliação');
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      toast.error('Erro ao enviar avaliação');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  if (!motorista) {
    return <div className="text-center mt-10">Motorista não encontrado</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Avaliar Motorista</h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Avaliando como</p>
            <p className="font-semibold">{userName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motorista
            </label>
            <div className="text-lg">{motorista.nome}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da Avaliação
            </label>
            <div className="text-lg bg-gray-100 p-2 rounded-md">{dataAvaliacao}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação
            </label>
            <StarRating value={nota} onChange={setNota} />
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentário
            </label>
            <Textarea
              value={comentario}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComentario(e.target.value)}
              placeholder="Digite seu comentário sobre o motorista..."
              className="w-full"
          />
        </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Enviar Avaliação
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/avaliacao-motoristas')}
              className="flex-1"
            >
              Cancelar
        </Button>
          </div>
      </form>
      </Card>
    </div>
  );
};

export default AvaliarMotoristaPage; 