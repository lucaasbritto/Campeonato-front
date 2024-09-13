import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Buscar Times
export function getTeams() {
  return apiClient.get('/teams');
}

