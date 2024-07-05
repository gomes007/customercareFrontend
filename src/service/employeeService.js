import axiosInstance, { API_URLS } from './axiosService';

const employeeService = {
  createEmployee: (data, files) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    if (files.photo) {
      formData.append('photo', files.photo);
    }
    if (files.dependents) {
      files.dependents.forEach((file, index) => {
        formData.append(`dependents[${index}].file`, file);
      });
    }
    return axiosInstance.post(API_URLS.employees, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateEmployee: (id, data, files) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    if (files.photo) {
      formData.append('photo', files.photo);
    }
    if (files.dependents) {
      files.dependents.forEach((file, index) => {
        formData.append(`dependents[${index}].file`, file);
      });
    }
    return axiosInstance.put(`${API_URLS.employees}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getEmployeeById: (id) => axiosInstance.get(`${API_URLS.employees}/${id}`)
};

export default employeeService;
