import { mockApi } from '../helpers';
import AxiosClient from './axios-client';

const bookingApi = {
  getAll: async () => {
    const url = '/bookings';
    return await AxiosClient.get(url);
  },

  getById: async (id) => {
    const url = `/bookings/${id}`;
    return await AxiosClient.get(url);
  },

  create: async (data) => {
    const url = '/bookings';
    return await AxiosClient.post(url, data);
  },

  update: async (id, data) => {
    const url = `/bookings/${id}`;
    return await AxiosClient.put(url, data);
  },

  delete: async (id) => {
    const url = `/bookings/${id}`;
    return await AxiosClient.delete(url);
  },

  getByStatus: async (status) => {
    const url = `/bookings/${status}`;
    return mockApi([
      {
        id: '1',
        roomName: 'Deluxe Room',
        customer: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '123-456-7890',
        checkInDate: '2023-05-01',
        checkOutDate: '2023-05-05',
        price: 100
      },
      {
        id: '2',
        roomName: 'Standard Room',
        customer: 'Jane Smith',
        email: 'janesmith@example.com',
        phoneNumber: '234-567-8901',
        checkInDate: '2023-06-01',
        checkOutDate: '2023-06-03',
        price: 80
      },
      {
        id: '3',
        roomName: 'Suite Room',
        customer: 'Bob Johnson',
        email: 'bobjohnson@example.com',
        phoneNumber: '345-678-9012',
        checkInDate: '2023-07-01',
        checkOutDate: '2023-07-07',
        price: 150
      }
    ]);
    return await AxiosClient.get(url);
  }
};

export default bookingApi;
