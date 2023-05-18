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
        return await AxiosClient.get(url);
    }
};

export default bookingApi;
