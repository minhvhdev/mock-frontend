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

  getByUser: async (userId) => {
    const url = `/bookings/user/${userId}`;
    return mockApi([
      {
        id: 1,
        room: {
          id: 6,
          name: 'Family Suite',
          type: 'Deluxe',
          description:
            'A spacious suite designed for families, featuring separate bedrooms and a common living area.',
          adultsMax: 4,
          childrenMax: 2,
          status: 'Available',
          price: 250.0,
          images: [
            {
              id: 22,
              imageUrl:
                'https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=70'
            },
            {
              id: 23,
              imageUrl:
                'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=70'
            },
            {
              id: 24,
              imageUrl:
                'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=70'
            }
          ]
        },
        user: {
          id: 2,
          name: 'Khoa Tran Phuoc',
          email: 'khoa@fpt.com',
          phoneNumber: '1234567890',
          username: 'admin',
          roles: [
            {
              id: 1,
              name: 'ROLE_ADMIN'
            }
          ]
        },
        price: 150.0,
        checkInDate: '2023-06-01T00:00:00.000+00:00',
        checkOutDate: '2023-06-05T00:00:00.000+00:00',
        adultsNumber: 2,
        childrenNumber: 1,
        status: 'Booked',
        personList: [
          {
            id: 1,
            name: 'John Doe',
            phoneNumber: '1234567890'
          },
          {
            id: 2,
            name: 'Jane Doe',
            phoneNumber: '9876543210'
          },
          {
            id: 3,
            name: 'Adam',
            phoneNumber: ''
          }
        ]
      },
      {
        id: 2,
        room: {
          id: 6,
          name: 'Family Suite',
          type: 'Deluxe',
          description:
            'A spacious suite designed for families, featuring separate bedrooms and a common living area.',
          adultsMax: 4,
          childrenMax: 2,
          status: 'Available',
          price: 250.0,
          images: [
            {
              id: 22,
              imageUrl:
                'https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=70'
            },
            {
              id: 23,
              imageUrl:
                'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=70'
            },
            {
              id: 24,
              imageUrl:
                'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=70'
            }
          ]
        },
        user: {
          id: 2,
          name: 'Khoa Tran Phuoc',
          email: 'khoa@fpt.com',
          phoneNumber: '1234567890',
          username: 'admin',
          roles: [
            {
              id: 1,
              name: 'ROLE_ADMIN'
            }
          ]
        },
        price: 150.0,
        checkInDate: '2023-06-01T00:00:00.000+00:00',
        checkOutDate: '2023-06-05T00:00:00.000+00:00',
        adultsNumber: 2,
        childrenNumber: 1,
        status: 'Booked',
        personList: [
          {
            id: 1,
            name: 'John Doe',
            phoneNumber: '1234567890'
          },
          {
            id: 2,
            name: 'Jane Doe',
            phoneNumber: '9876543210'
          },
          {
            id: 3,
            name: 'Adam',
            phoneNumber: ''
          }
        ]
      },
    ]);
    return await AxiosClient.get(url);
  }
};

export default bookingApi;
