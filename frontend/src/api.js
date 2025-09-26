// src/api.js
import axios from 'axios';

// Create Axios instance pointing to deployed backend
const API = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || 'https://dsa-tracker-b8zw.onrender.com') + '/api', // Backend URL with fallback
});

// Add JWT token to headers if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Your JWT token stored in localStorage
  if (token) req.headers.Authorization = `Bearer ${token}`; // Add Bearer token
  return req;
});

// DSA Problem API calls

// Create new problem
export const addProblem = async (problemData) => {
  const res = await API.post('/dsa/add', problemData);
  return res.data;
};

// Get all problems for the logged-in user
export const getProblems = async () => {
  const res = await API.get('/dsa');
  return res.data;
};

// Update a problem by ID
export const updateProblem = async (id, updatedData) => {
  const res = await API.put(`/dsa/${id}`, updatedData);
  return res.data;
};

// Delete a problem by ID
export const deleteProblem = async (id) => {
  const res = await API.delete(`/dsa/${id}`);
  return res.data;
};

// Export the Axios instance for direct use if needed
export default API;
