import { slide1, slide2, slide3 } from '../assets/images';
import { mockApi } from '../helpers';
import AxiosClient from './axios-client';

const roomApi = {
  getAll: async () => {
    const url = '/rooms';
    return await AxiosClient.get(url);
  },

  getById: async (id) => {
    const url = `/rooms/${id}`;
    return await AxiosClient.get(url);
  },

  create: async (data) => {
    const url = '/rooms';
    return await AxiosClient.post(url, data);
  },

  update: async (id, data) => {
    const url = `/rooms/${id}`;
    return await AxiosClient.put(url, data);
  },

  delete: async (id) => {
    const url = `/rooms/${id}`;
    return await AxiosClient.delete(url);
  },

  search: async (searchRoomRequest) => {
    const url = '/rooms/search';
    return await AxiosClient.post(url, searchRoomRequest);
  },

  maxAdults: async () => {
    const url = `/rooms/max-adult`
    return await AxiosClient.get(url)
  },

  maxChildren: async () => {
    const url = `/rooms/max-children`
    return await AxiosClient.get(url)
  },
};

export default roomApi;
