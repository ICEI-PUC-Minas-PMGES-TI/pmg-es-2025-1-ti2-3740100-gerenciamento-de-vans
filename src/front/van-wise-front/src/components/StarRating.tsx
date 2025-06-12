import React from 'react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, readOnly }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            fontSize: 28,
            color: star <= value ? '#fbbf24' : '#d1d5db',
            transition: 'color 0.2s',
          }}
          onClick={() => !readOnly && onChange && onChange(star)}
          data-testid={`star-${star}`}
        >
          {star <= value ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating; 