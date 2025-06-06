import React from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: 'pointer',
            color: star <= value ? '#FFD700' : '#CCC',
            fontSize: 32,
          }}
          onClick={() => onChange(star)}
          data-testid={`star-${star}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating; 