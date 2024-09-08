import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Sort from './components/Sort';
import CreditProduct from './components/CreditProduct';
import { useLocation, useHistory } from 'react-router-dom';
import mockData from './mock.json';

const App: React.FC = () => {
  const [products, setProducts] = useState([]); // Все продукты
  const [filteredProducts, setFilteredProducts] = useState([]); // Отфильтрованные продукты
  const [minAmount, setMinAmount] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  
  const location = useLocation();
  const history = useHistory();

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
    if (savedOrder) setSortOrder(savedOrder as 'asc' | 'desc');
  }, [location.search]);

  // Обработчик фильтрации
  const handleFilter = (minAmount: number) => {
    setMinAmount(minAmount);
    const filtered = products.filter(product => product.amount >= minAmount);
    setFilteredProducts(filtered);

    updateURL(minAmount, sortOrder); // Сохраняем в URL
    saveProducts(filtered); // Сохраняем в localStorage
  };

  // Обработчик сортировки
  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) =>
      order === 'asc' ? a.amount - b.amount : b.amount - a.amount
    );
    setFilteredProducts(sorted);

    updateURL(minAmount, order); // Сохраняем в URL
    saveProducts(sorted); // Сохраняем в localStorage
  };

  // Функция обновления URL с параметрами
  const updateURL = (minAmount: number | null, order: 'asc' | 'desc' | null) => {
    const params = new URLSearchParams();
    if (minAmount !== null) params.set('minAmount', String(minAmount));
    if (order !== null) params.set('order', order);
    history.push({ search: params.toString() });
  };

  // Сохранение отфильтрованных продуктов в localStorage
  const saveProducts = (products: any[]) => {
    localStorage.setItem('savedProducts', JSON.stringify(products));
  };

  return (
    <div>
      <h1>Кредитные продукты</h1>
      <Filter onFilter={handleFilter} initialMinAmount={minAmount} />
      <Sort onSort={handleSort} initialOrder={sortOrder} />
      <div>
        {filteredProducts.map((product, index) => (
          <CreditProduct key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default App;