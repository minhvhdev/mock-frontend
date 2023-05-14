import { mockApi } from '../helpers';
import AxiosClient from './axios-client';

const userApi = {
  login: async (data) => {
    const url = '/user/login';
    //Remove mock when integrate
    return mockApi({
      name: 'Minh',
      isAdmin: true,
      token: 'abcd'
    });
    return await AxiosClient.post(url, data);
  }
};

export default userApi;
