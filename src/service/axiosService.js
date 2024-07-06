import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user && user.token){
            config.headers["Authorization"] = "Bearer " + user.token;
        }

        console.log('Config for request:', config);
        return config;
    },
    error => {
        console.error('Error with request:', error);
        return Promise.reject(error);
    }
);


export const API_URLS = {
    roles: `${BASE_URL}/roles`,
    rolesByName: `${BASE_URL}/roles/search/by-name`,
    rolesByPermission: `${BASE_URL}/roles/search/by-permission`,
    permissions: `${BASE_URL}/permissions`,
    positionSalary: `${BASE_URL}/position-salaries`,
    positionSalaryByPosition: `${BASE_URL}/position-salaries/search/by-position`,
    positionSalaryByRole: `${BASE_URL}/position-salaries/search/by-role`,
    employees: `${BASE_URL}/employees`,
  };
  

export const PAGINATION_DEFAULTS = {
  page: 0,
  size: 20,
};

export default axiosInstance;
