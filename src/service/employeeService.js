import axiosInstance, { API_URLS } from './axiosService';

const employeeService = {
  createEmployee: async (data, files) => {
    const formData = new FormData();

    appendFormData(formData, data);
    if (files && files.photo) {
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

const appendFormData = (formData, data, parentKey = '') => {
  Object.keys(data).forEach(key => {
    const value = data[key];
    const formKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      appendFormData(formData, value, formKey);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item && typeof item === 'object') {
          appendFormData(formData, item, `${formKey}[${index}]`);
        } else {
          formData.append(`${formKey}[${index}]`, item);
        }
      });
    } else {
      formData.append(formKey, value);
    }
  });
};


export default employeeService;