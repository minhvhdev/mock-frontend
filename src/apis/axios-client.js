import axios from 'axios';
import { BASE_API_URL } from '../constants';

export const getToken = () => {
  const token = localStorage.get('token');
  if (!token) {
    return null;
  }
  return token.accessToken;
};

const AxiosClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'content-type': 'application/json'
  }
});

AxiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default AxiosClient;
