import axiosInstance, { API_URLS, PAGINATION_DEFAULTS } from "./axiosService";

const createPermission = async (data) => {
  const response = await axiosInstance.post(API_URLS.permissions, data);
  return response.data;
};

const getPermissions = async (
  page = PAGINATION_DEFAULTS.page,
  size = PAGINATION_DEFAULTS.size
) => {
  const response = await axiosInstance.get(API_URLS.permissions, {
    params: { page, size },
  });
  return response.data;
};

const updatePermission = async (data) => {
  const response = await axiosInstance.put(`${API_URLS.permissions}/${data.id}`, data);
  return response.data;
};

const deletePermission = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URLS.permissions}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error deleting permission');
    }
    throw new Error('Error deleting permission');
  }
};

export { createPermission, deletePermission, getPermissions, updatePermission };
