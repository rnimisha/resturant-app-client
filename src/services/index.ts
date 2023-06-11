import axios from 'axios';
import { store } from '../app/store';

const getToken = (): string => {
  const state = store.getState();
  const token = state.user.token;
  return token;
};

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
