import React, { useState } from 'react';

interface FilterProps {
  onFilter: (minAmount: number) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [minAmount, setMinAmount] = useState<number>(0);

  const handleFilter = () => {
    onFilter(minAmount);
  };

  return (
    <div>
      <input
        type="number"
        value={minAmount}
        onChange={(e) => setMinAmount(Number(e.target.value))}
        placeholder="Минимальная сумма кредита"
      />
      <button onClick={handleFilter}>Применить фильтр</button>
    </div>
  );
};

export default Filter;
