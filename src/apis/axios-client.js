import axios from 'axios';
import { BASE_API_URL } from '../constants';

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return null;
  }
  return user.token;
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
    console.log(error);
    throw error;
  }
);

export default AxiosClient;
