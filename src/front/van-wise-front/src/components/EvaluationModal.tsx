import React, { useState } from 'react';
import StarRating from './StarRating';

interface EvaluationModalProps {
  driverName: string;
  date: string;
  initialRating?: number;
  initialComment?: string;
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({
  driverName,
  date,
  initialRating = 0,
  initialComment = '',
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-semibold">Avaliar Motorista</h2>
          <div className="text-right text-sm text-gray-500">Avaliando como<br /><span className="font-bold">Você</span></div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600 text-sm">Motorista</div>
          <div className="font-medium">{driverName}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600 text-sm">Data da Avaliação</div>
          <input
            className="w-full bg-gray-100 rounded px-2 py-1 mt-1 text-gray-700"
            value={date}
            disabled
          />
        </div>
        <div className="mb-2">
          <div className="text-gray-600 text-sm">Avaliação</div>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <div className="mb-4">
          <div className="text-gray-600 text-sm">Comentário</div>
          <textarea
            className="w-full border rounded px-2 py-1 mt-1 min-h-[70px]"
            placeholder="Digite seu comentário sobre o motorista..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxLength={300}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition"
            onClick={() => onSubmit(rating, comment)}
            disabled={loading || rating === 0}
          >
            {loading ? 'Enviando...' : 'Enviar Avaliação'}
          </button>
          <button
            className="bg-gray-200 px-6 py-2 rounded font-semibold hover:bg-gray-300 transition"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal; 