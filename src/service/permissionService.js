import axios from "axios";
import { API_URLS, PAGINATION_DEFAULTS } from "./apiConfig";

const createPermission = async (data) => {
  const response = await axios.post(API_URLS.permissions, data);
  return response.data;
};

const getPermissions = async (
  page = PAGINATION_DEFAULTS.page,
  size = PAGINATION_DEFAULTS.size
) => {
  const response = await axios.get(API_URLS.permissions, {
    params: { page, size },
  });
  return response.data;
};

const updatePermission = async (data) => {
  const response = await axios.put(`${API_URLS.permissions}/${data.id}`, data);
  return response.data;
};

const deletePermission = async (id) => {
  const response = await axios.delete(`${API_URLS.permissions}/${id}`);
  return response.data;
};

export { createPermission, deletePermission, getPermissions, updatePermission };
