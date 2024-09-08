import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Sort from './components/Sort';
import CreditProduct from './components/CreditProduct';
import { useLocation, useNavigate } from 'react-router-dom';
import mockData from './mock.json';

const App = () => {
  const [products, setProducts] = useState([]); // Все продукты
  const [filteredProducts, setFilteredProducts] = useState([]); // Отфильтрованные продукты
  const [minAmount, setMinAmount] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Инициализация данных из mock.json и параметров из URL/LocalStorage
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const savedMinAmount = queryParams.get('minAmount');
    const savedOrder = queryParams.get('order');
    const savedProducts = localStorage.getItem('savedProducts');

    setProducts(mockData.products);

    if (savedProducts) {
      setFilteredProducts(JSON.parse(savedProducts));
    } else {
      setFilteredProducts(mockData.products);
    }

    if (savedMinAmount) setMinAmount(Number(savedMinAmount));
    if (savedOrder) setSortOrder(savedOrder);
  }, [location.search]);

  // Обработчик фильтрации
  const handleFilter = (minAmount) => {
    setMinAmount(minAmount);
    const filtered = products.filter(product => product.amount >= minAmount);
    setFilteredProducts(filtered);

    updateURL(minAmount, sortOrder); // Сохраняем в URL
    saveProducts(filtered); // Сохраняем в localStorage
  };

  // Обработчик сортировки
  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) =>
      order === 'asc' ? a.amount - b.amount : b.amount - a.amount
    );
    setFilteredProducts(sorted);

    updateURL(minAmount, order); // Сохраняем в URL
    saveProducts(sorted); // Сохраняем в localStorage
  };

  // Функция обновления URL с параметрами
  const updateURL = (minAmount, order) => {
    const params = new URLSearchParams();
    if (minAmount !== null) params.set('minAmount', String(minAmount));
    if (order !== null) params.set('order', order);
    navigate(`?${params.toString()}`);
  };

  // Сохранение отфильтрованных продуктов в localStorage
  const saveProducts = (products) => {
    localStorage.setItem('savedProducts', JSON.stringify(products));
  };

  return (
    <div className="container">
      <h1>Кредитные продукты</h1>
      <div className="filters">
        <Filter onFilter={handleFilter} initialMinAmount={minAmount} />
        <Sort onSort={handleSort} initialOrder={sortOrder} />
      </div>
      <div className="products">
        {filteredProducts.map((product, index) => (
          <CreditProduct key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default App;
