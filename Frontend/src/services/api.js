import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchUsers = () => axios.get(`${API_BASE_URL}/users`);
export const fetchProducts = () => axios.get(`${API_BASE_URL}/products`);
export const fetchTotalSales = () => axios.get(`${API_BASE_URL}/sales/total`);
export const fetchSalesByMonth = () => axios.get(`${API_BASE_URL}/sales/by-month`);

export const createProduct = (productData) => axios.post(`${API_BASE_URL}/products`, productData);
export const updateProduct = (id, productData) => axios.put(`${API_BASE_URL}/products/${id}`, productData);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/products/${id}`);