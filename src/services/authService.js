import api from './api';

export default {
  login(credentials) {
    return api.post('/login', credentials);
  },
  register(data) {
    return api.post('/register', data);
  },
};