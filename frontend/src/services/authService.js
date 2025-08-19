import api from './api';

export const loginUser = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const registerBuyer = (data) => {
  return api.post('/auth/register/buyer', data);
};

export const registerSeller = (data) => {
  return api.post('/auth/register/seller', data);
};

export const getProfile = () => {
  return api.get('/auth/me');
};
