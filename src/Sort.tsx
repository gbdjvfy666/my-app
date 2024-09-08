import React, { useState } from 'react';

interface FilterProps {
  onFilter: (minAmount: number) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [minAmount, setMinAmount] = useState(0);

  return (
    <div>
      <input
        type="number"
        value={minAmount}
        onChange={(e) => setMinAmount(Number(e.target.value))}
        placeholder="Минимальная сумма"
      />
      <button onClick={() => onFilter(minAmount)}>Фильтровать</button>
    </div>
  );
};

export default Filter;