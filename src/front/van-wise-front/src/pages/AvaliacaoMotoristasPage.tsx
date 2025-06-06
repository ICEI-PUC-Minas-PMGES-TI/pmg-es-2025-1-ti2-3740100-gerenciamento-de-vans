import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Motorista {
  id: number;
  nome: string;
  fotoUrl?: string;
}

const AvaliacaoMotoristasPage: React.FC = () => {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/api/motoristas')
      .then((res) => res.json())
      .then((data) => {
        setMotoristas(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando motoristas...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Selecione o motorista para avaliar</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {motoristas.map((motorista) => (
          <li key={motorista.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16, border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <img
              src={motorista.fotoUrl || 'https://via.placeholder.com/48'}
              alt={motorista.nome}
              style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 16 }}
            />
            <span style={{ flex: 1 }}>{motorista.nome}</span>
            <button onClick={() => navigate(`/avaliar-motorista/${motorista.id}`)}>
              Avaliar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvaliacaoMotoristasPage; 