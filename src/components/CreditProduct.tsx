import React from 'react';

interface CreditProductProps {
  name: string;
  amount: number;
  interestRate: number;
}

const CreditProduct: React.FC<CreditProductProps> = ({ name, amount, interestRate }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Сумма: {amount} ₽</p>
      <p>Процентная ставка: {interestRate}%</p>
    </div>
  );
};

export default CreditProduct;
