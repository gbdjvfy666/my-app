import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Sort from './components/Sort';
import CreditProduct from './components/CreditProduct';
import mockData from './mock.json';

const App: React.FC = () => {
  const [products, setProducts] = useState([]); // Все продукты
  const [filteredProducts, setFilteredProducts] = useState([]); // Отфильтрованные продукты

  useEffect(() => {
    // Инициализация данных из mock.json
    setProducts(mockData.products); 
    setFilteredProducts(mockData.products); // Изначально показываем все продукты
  }, []);

  const handleFilter = (minAmount: number) => {
    // Фильтруем продукты по минимальной сумме
    const filtered = products.filter(product => product.amount >= minAmount);
    setFilteredProducts(filtered);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    // Сортировка продуктов по сумме
    const sorted = [...filteredProducts].sort((a, b) =>
      order === 'asc' ? a.amount - b.amount : b.amount - a.amount
    );
    setFilteredProducts(sorted);
  };

  return (
    <div>
      <h1>Кредитные продукты</h1>
      <Filter onFilter={handleFilter} />
      <Sort onSort={handleSort} />
      <div>
        {filteredProducts.map((product, index) => (
          <CreditProduct key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

useEffect(() => {
  const savedProducts = localStorage.getItem('savedProducts');
  if (savedProducts) {
    setFilteredProducts(JSON.parse(savedProducts));
  }
}, []);

const saveProducts = () => {
  localStorage.setItem('savedProducts', JSON.stringify(filteredProducts));
};

export default App;
