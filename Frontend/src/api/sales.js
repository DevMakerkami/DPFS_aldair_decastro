import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Ajusta esto si tu backend está en un puerto diferente

export const getSales = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sales`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

export const getSaleById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/sales/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sale with id ${id}:`, error);
    throw error;
  }
};

export const createSale = async (saleData) => {
  try {
    const response = await axios.post(`${BASE_URL}/sales`, saleData);
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};

export const getTotalSales = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sales/total`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total sales:', error);
    throw error;
  }
};

export const getSalesByPeriod = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/sales/period`, {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales by period:', error);
    throw error;
  }
};