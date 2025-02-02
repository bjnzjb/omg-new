// src/lib/apiClient.ts

import axios from 'axios';

// Create an instance of Axios with default settings
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set the base URL for your API
  headers: {
    'Content-Type': 'application/json' // Set default headers (can be modified per request)
  }
});

// Function to handle GET requests
export const get = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Function to handle POST requests
export const post = async (endpoint: string, body: any) => {
  try {
    const response = await apiClient.post(endpoint, body);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Function to handle PUT requests (update data)
export const put = async (endpoint: string, body: any) => {
  try {
    const response = await apiClient.put(endpoint, body);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error updating data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Function to handle DELETE requests
export const del = async (endpoint: string) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default apiClient;
