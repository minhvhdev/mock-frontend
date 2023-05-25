import { mockApi } from '../helpers';
import AxiosClient from './axios-client';

const userApi = {
  login: async (data) => {
    const url = '/auth/login';
    return mockApi({ name: 'minh' });
    return await AxiosClient.post(url, data);
  },

  register: async (data) => {
    const url = '/auth/register';
    return await AxiosClient.post(url, data);
  },

  getAll: async () => {
    const url = '/users';
    return await AxiosClient.get(url);
  },

  getById: async (id) => {
    const url = `/users/${id}`;
    return await AxiosClient.get(url);
  },

  update: async (id, data) => {
    const url = `/users/${id}`;
    return await AxiosClient.put(url, data);
  },

  delete: async (id) => {
    const url = `/users/${id}`;
    return await AxiosClient.delete(url);
  }
};

export default userApi;
