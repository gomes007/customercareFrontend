import axiosInstance, { API_URLS } from './axiosService';

const employeeService = {
  createEmployee: async (data, files) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key === 'positionSalary') {
        formData.append('positionSalary.id', data[key].id);
      } else if (key === 'addresses' || key === 'dependents') {
        data[key].forEach((item, index) => {
          Object.keys(item).forEach(subKey => {
            if (subKey === 'addresses') {
              item[subKey].forEach((address, addrIndex) => {
                Object.keys(address).forEach(addrKey => {
                  formData.append(`${key}[${index}].addresses[${addrIndex}].${addrKey}`, address[addrKey]);
                });
              });
            } else {
              formData.append(`${key}[${index}].${subKey}`, item[subKey]);
            }
          });
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    if (files.photo) {
      formData.append('photo', files.photo);
    }

    data.dependents.forEach((dependent, index) => {
      if (dependent.file) {
        formData.append(`dependents[${index}].file`, dependent.file);
      }
    });

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
