import axiosInstance, { API_URLS, PAGINATION_DEFAULTS } from "./axiosService";

export const getRoles = async (
  page = PAGINATION_DEFAULTS.page,
  size = PAGINATION_DEFAULTS.size
) => {
  const response = await axiosInstance.get(API_URLS.roles, {
    params: { page, size },
  });
  return response.data;
  console.log("Service - Getting roles:", response.data);
};

export const getRolesByName = async (
  name,
  page = PAGINATION_DEFAULTS.page,
  size = PAGINATION_DEFAULTS.size
) => {
  const response = await axiosInstance.get(API_URLS.rolesByName, {
    params: { name, page, size },
  });
  console.log("Service - Getting roles by name:", response.data);
  return response.data;
};

export const getRolesByPermissionName = async (
  permissionName,
  page = PAGINATION_DEFAULTS.page,
  size = PAGINATION_DEFAULTS.size
) => {
  const response = await axiosInstance.get(API_URLS.rolesByPermission, {
    params: { permissionName, page, size },
  });
  console.log("Service - Getting roles by permission name:", response.data);
  return response.data;
};

export const createRole = async (role) => {
  console.log("Service - Sending role:", role);
  const response = await axiosInstance.post(API_URLS.roles, role);
  return response.data ?? role;
};

export const updateRole = async (id, role) => {
  await axiosInstance.put(`${API_URLS.roles}/${id}`, role);
};

export const deleteRole = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URLS.roles}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error deleting role");
    }
    throw new Error("Error deleting role");
  }
};
