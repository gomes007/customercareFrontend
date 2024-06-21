import axios from "axios";
import { API_URLS } from "./apiConfig";

export const getPermissions = async () => {
  const response = await axios.get(API_URLS.permissions);
  return response.data;
};

export const getPermission = async (id) => {
  const response = await axios.get(`${API_URLS.permissions}/${id}`);
  return response.data;
};

export const createPermission = async (permission) => {
  const response = await axios.post(API_URLS.permissions, permission);
  return response.data;
};

export const updatePermission = async (permission) => {
  const response = await axios.put(
    `${API_URLS.permissions}/${permission.id}`,
    permission
  );
  return response.data;
};

export const deletePermission = async (id) => {
  const response = await axios.delete(`${API_URLS.permissions}/${id}`);
  return response.data;
};

export const getPermissionRoles = async (id) => {
  const response = await axios.get(`${API_URLS.permissions}/${id}/roles`);
  return response.data;
};

export const updatePermissionRoles = async (id, roles) => {
  const response = await axios.put(
    `${API_URLS.permissions}/${id}/roles`,
    roles
  );
  return response.data;
};

export const getPermissionUsers = async (id) => {
  const response = await axios.get(`${API_URLS.permissions}/${id}/users`);
  return response.data;
};
