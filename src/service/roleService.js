import axios from "axios";
import { API_URLS } from "./apiConfig";

export const getRoles = async () => {
  const response = await axios.get(API_URLS.roles);
  return response.data;
};

export const getRole = async (id) => {
  const response = await axios.get(`${API_URLS.roles}/${id}`);
  return response.data;
};

export const createRole = async (role) => {
  const response = await axios.post(API_URLS.roles, role);
  return response.data;
};

export const updateRole = async (role) => {
  const response = await axios.put(`${API_URLS.roles}/${role.id}`, role);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axios.delete(`${API_URLS.roles}/${id}`);
  return response.data;
};

export const getRolePermissions = async (id) => {
  const response = await axios.get(`${API_URLS.roles}/${id}/permissions`);
  return response.data;
};

export const updateRolePermissions = async (id, permissions) => {
  const response = await axios.put(
    `${API_URLS.roles}/${id}/permissions`,
    permissions
  );
  return response.data;
};
