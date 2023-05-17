import { mockApi } from '../helpers';
import AxiosClient from './axios-client';

const userApi = {
  login: async (data) => {
    const url = '/auth/login';
    return await AxiosClient.post(url, data);
  }

};

export default userApi;
