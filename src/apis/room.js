import { slide1, slide2, slide3 } from '../assets/images';
import { mockApi } from '../helpers';
import AxiosClient from './axios-client';

const roomApi = {
  getAll: async () => {
    const url = '/rooms';
    return mockApi([
      {
        id: 1,
        price: 100000,
        status: 'Available',
        name: 'Deluxe Double Room',
        image: slide1
      },
      {
        id: 2,
        price: 100000,
        status: 'Available',
        name: 'Deluxe Double Room',
        image: slide1
      },
      {
        id: 3,
        price: 100000,
        status: 'Available',
        name: 'Deluxe Double Room',
        image: slide1
      },
      {
        id: 4,
        price: 100000,
        status: 'Available',
        name: 'Deluxe Double Room',
        image: slide1
      },
      {
        id: 5,
        price: 100000,
        status: 'Available',
        name: 'Deluxe Double Room',
        image: slide1
      },
      {
        id: 6,
        price: 100000,
        status: 'Available',
        name: 'Deluxe Double Room',
        image: slide1
      }
    ]);
    return await AxiosClient.get(url);
  },

  getById: async (id) => {
    const url = `/rooms/${id}`;
    return mockApi({
      id: 1,
      price: 100000,
      status: 'Available',
      name: 'Deluxe Double Room',
      description:
        'Deluxe Single Room is only reserved for one guest. There is a bedroom with a small double size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.',
      images: [
        {
          id: 1,
          url: slide1
        },
        {
          id: 2,
          url: slide2
        },
        {
          id: 3,
          url: slide3
        }
      ]
    });
    return await AxiosClient.get(url);
  },

  getTypeOptions: async () => {
    const url = '/type-options';
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

  searchByStatus: async (status) => {
    const url = '/rooms/searchByStatus';
    const params = { status };
    return await AxiosClient.get(url, { params });
  }
};

export default roomApi;
