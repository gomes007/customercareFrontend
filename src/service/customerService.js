import axiosInstance, { API_URLS } from './axiosService';

const customerService = {
    createCustomer: async (data) => {
        try {
            const response = await axiosInstance.post(API_URLS.customers, data);
            return response.data;
        } catch (error) {
            console.error("Error creating customer:", error);
            throw error;
        }
    }
};

export default customerService;