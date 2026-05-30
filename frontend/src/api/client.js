import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
});

// Avoid trailing-slash redirects that can break Spring Security on some requests
api.interceptors.request.use((config) => {
  if (config.url?.endsWith('/') && config.url !== '/') {
    config.url = config.url.replace(/\/+$/, '');
  }
  return config;
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
};

export const bookApi = {
  getAll: () => api.get('/api/books'),
  search: (q) => api.get('/api/books/search', { params: { q } }),
  getById: (id) => api.get(`/api/books/${id}`),
  create: (data) => api.post('/api/books', data),
  update: (id, data) => api.put(`/api/books/${id}`, data),
  delete: (id) => api.delete(`/api/books/${id}`),
};

export const cartApi = {
  get: () => api.get('/api/cart'),
  addItem: (data) => api.post('/api/cart/items', data),
  removeItem: (bookId) => api.delete(`/api/cart/items/${bookId}`),
  clear: () => api.delete('/api/cart'),
};

export const orderApi = {
  place: () => api.post('/api/orders'),
  history: () => api.get('/api/orders/history'),
};

export default api;
