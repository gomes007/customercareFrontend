import axiosInstance from "./axiosService";

const authService = {
    login: async (email, password) => {
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;