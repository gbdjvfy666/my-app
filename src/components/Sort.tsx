import React from 'react';

interface SortProps {
  onSort: (order: 'asc' | 'desc') => void;
}

const Sort: React.FC<SortProps> = ({ onSort }) => {
  return (
    <div>
      <button onClick={() => onSort('asc')}>Сортировать по возрастанию</button>
      <button onClick={() => onSort('desc')}>Сортировать по убыванию</button>
    </div>
  );
};

export default Sort;
