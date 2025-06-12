import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRating from '../components/StarRating';
import EvaluationModal from '../components/EvaluationModal';

// Tipos simplificados para exemplo
interface Driver {
  id: number;
  name: string;
}
interface Trip {
  id: number;
  driver: Driver;
  date: string;
  checkedOut: boolean;
  user?: { id: number; name: string };
}
interface Evaluation {
  id: number;
  user: { id: number; name: string };
  driver: { id: number; name: string };
  rating: number;
  comment: string;
  date: string;
}

const loggedUser = { id: 1, name: 'Luiz Gustavo' };

const API_URL = 'http://localhost:8081/api';

const EvaluationPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [canEvaluate, setCanEvaluate] = useState<{[tripId:number]: boolean}>({});

  // Buscar viagens do usuário do dia atual
  useEffect(() => {
    axios.get(`${API_URL}/trips/user/${loggedUser.id}/today`)
      .then(res => setTrips(res.data))
      .catch(() => setTrips([]));
  }, []);

  // Buscar avaliações do usuário para cada motorista dessas viagens
  useEffect(() => {
    async function fetchEvaluations() {
      try {
        const allEvals: Evaluation[] = [];
        for (const trip of trips) {
          const res = await axios.get(`${API_URL}/evaluations/driver/${trip.driver.id}`);
          const evals: Evaluation[] = res.data.filter((e: Evaluation) => e.user.id === loggedUser.id);
          if (evals.length > 0) allEvals.push(...evals);
        }
        setEvaluations(allEvals);
      } catch (err) {
        setErrorMsg('Erro ao buscar avaliações.');
      }
    }
    if (trips.length > 0) fetchEvaluations();
  }, [trips]);

  // Verificar se pode avaliar cada viagem hoje
  useEffect(() => {
    async function checkCanEvaluate() {
      const result: {[tripId:number]: boolean} = {};
      for (const trip of trips) {
        try {
          const res = await axios.get(`${API_URL}/evaluations/can-evaluate`, {
            params: { userId: loggedUser.id, driverId: trip.driver.id }
          });
          result[trip.id] = res.data;
        } catch {
          result[trip.id] = false;
        }
      }
      setCanEvaluate(result);
    }
    if (trips.length > 0) checkCanEvaluate();
  }, [trips, evaluations]);

  const handleOpenModal = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmit = async (rating: number, comment: string) => {
    if (!selectedTrip) return;
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await axios.post(`${API_URL}/evaluations`, {
        userId: loggedUser.id,
        driverId: selectedTrip.driver.id,
        tripId: selectedTrip.id,
        rating,
        comment,
      });
      setSuccessMsg('Avaliação enviada com sucesso!');
      setShowModal(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Erro ao enviar avaliação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Avaliação de Motoristas</h1>
        <div className="text-right text-gray-500 text-sm">
          Bem-vindo(a),<br />
          <span className="font-bold">{loggedUser.name}</span>
        </div>
      </div>
      {successMsg && <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">{successMsg}</div>}
      {errorMsg && <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">{errorMsg}</div>}
      <div className="space-y-4">
        {trips.length === 0 && <div className="text-gray-500">Nenhuma viagem para avaliar hoje.</div>}
        {trips.map(trip => {
          const todayEval = evaluations.find(e => e.driver.id === trip.driver.id && e.date === new Date().toISOString().slice(0,10));
          return (
            <div key={trip.id} className="bg-white rounded-xl p-6 flex items-center justify-between shadow">
              <div>
                <div className="font-semibold text-lg mb-1">{trip.driver.name}</div>
                <div className="text-gray-600 text-sm">Data da viagem: {new Date(trip.date).toLocaleDateString('pt-BR')}</div>
                <div className="text-gray-600 text-sm">Status: {trip.checkedOut ? 'Check-out confirmado' : 'Em andamento'}</div>
                {trip.user && (
                  <div className="text-gray-600 text-sm">Passageiro: {trip.user.name}</div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <StarRating value={todayEval ? todayEval.rating : 0} readOnly />
                  <span className="text-gray-500 text-sm">( avaliações )</span>
                </div>
                {todayEval && (
                  <div className="mt-2 text-sm text-green-700">Você já avaliou este motorista hoje.</div>
                )}
              </div>
              <button
                className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                onClick={() => handleOpenModal(trip)}
                disabled={!canEvaluate[trip.id]}
              >
                Avaliar
              </button>
            </div>
          );
        })}
      </div>
      {showModal && selectedTrip && (
        <EvaluationModal
          driverName={selectedTrip.driver.name}
          date={new Date().toLocaleDateString('pt-BR')}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default EvaluationPage; 