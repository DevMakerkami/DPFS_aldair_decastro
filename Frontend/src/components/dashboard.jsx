import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaUsers, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = 'http://localhost:3000/api';

// DashboardCard Component
const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl text-blue-500">{icon}</div>
    </div>
  </div>
);

// StatsSummary Component
const StatsSummary = ({ totalUsers, totalProducts, totalSales }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <DashboardCard title="Total Users" value={totalUsers} icon={<FaUsers />} />
    <DashboardCard title="Total Products" value={totalProducts} icon={<FaShoppingCart />} />
    <DashboardCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} icon={<FaMoneyBillWave />} />
  </div>
);

// BarChart Component
const BarChart = ({ data, options }) => <Bar data={data} options={options} />;

// ProductList Component
const ProductList = ({ products }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, sales: 0 });
  const [productList, setProductList] = useState([]);
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [{
      label: 'Sales by Month',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [usersResponse, productsResponse, salesResponse, salesByMonthResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/users`),
          axios.get(`${API_BASE_URL}/products`),
          axios.get(`${API_BASE_URL}/sales/total`),
          axios.get(`${API_BASE_URL}/sales/by-month`)
        ]);

        setStats({
          users: usersResponse.data.length,
          products: productsResponse.data.length,
          sales: salesResponse.data.total
        });
        setProductList(productsResponse.data.slice(0, 5)); // Show only top 5 products
        setSalesData({
          labels: salesByMonthResponse.data.map(item => item.month),
          datasets: [{
            label: 'Sales by Month',
            data: salesByMonthResponse.data.map(item => item.total),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }]
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('An error occurred while fetching dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Delichoice Dashboard</h1>
      <StatsSummary 
        totalUsers={stats.users}
        totalProducts={stats.products}
        totalSales={stats.sales}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <BarChart data={salesData} options={chartOptions} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <ProductList products={productList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;