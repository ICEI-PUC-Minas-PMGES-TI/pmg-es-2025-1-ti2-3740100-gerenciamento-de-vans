import React from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, max = 5 }) => {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{
            cursor: 'pointer',
            color: i < value ? '#FFD700' : '#ccc',
            fontSize: 32,
          }}
          onClick={() => onChange(i + 1)}
          data-testid={`star-${i + 1}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}; 