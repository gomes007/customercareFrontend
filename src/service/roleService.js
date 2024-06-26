import axiosInstance, { API_URLS } from "./axiosService";

export const getRoles = async (
  page = PAGINATION_DEFAULTS.page,
  size = PAGINATION_DEFAULTS.size
) => {
  const response = await axiosInstance.get(API_URLS.roles, {
    params: { page, size },
  });
  return response.data;
  console.log('Service - Getting roles:', response.data);
};

export const getRole = async (id) => {
  const response = await axiosInstance.get(`${API_URLS.roles}/${id}`);
  return response.data;
};

export const createRole = async (role) => {
  console.log('Service - Sending role:', role); 
  const response = await axiosInstance.post(API_URLS.roles, role)
  return response.data ?? role;
};

export const updateRole = async (id, role) => {
  await axiosInstance.put(`${API_URLS.roles}/${id}`, role);
};

export const deleteRole = async (id) => {
  const response = await axiosInstance.delete(`${API_URLS.roles}/${id}`);
  return response.data;
};




