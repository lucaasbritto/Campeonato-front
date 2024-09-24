import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL ,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Buscar Times
export function getTeams() {
  return apiClient.get('/teams');
}

// Buscar Classificação
export function getClassification() {
  return apiClient.get('/classification');
}

// Buscar Jogos
export function getMatches() {
  return apiClient.get('/matches');
}

// Buscar Artilheiro
export function getTopScorers() {
  return apiClient.get('/topScorers');
}

