import axios from 'axios';
import { API_URLS } from './apiConfig';

const createPermission = async (data) => {
  const response = await axios.post(API_URLS.permissions, data);
  return response.data;
};

const getPermissions = async () => {
  const response = await axios.get(API_URLS.permissions);
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

export {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission,
};
