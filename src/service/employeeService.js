import axiosInstance, { API_URLS } from './axiosService';

const employeeService = {
  createEmployee: async (data, files) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key === 'positionSalary') {
        formData.append('positionSalary.id', data[key].id);
      } else {
        formData.append(key, data[key]);
      }
    });    

    if (files.photo) {
      formData.append('photo', files.photo);
    }

    try {
      const response = await axiosInstance.post(API_URLS.employees, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },
};




export default employeeService;
