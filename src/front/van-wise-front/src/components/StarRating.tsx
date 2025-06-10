import React from 'react';

export interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, readonly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          className={`text-2xl ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'
          }`}
          disabled={readonly}
        >
          {star <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default StarRating; 