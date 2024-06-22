const BASE_URL = 'http://localhost:8080/api';

export const API_URLS = {
  roles: `${BASE_URL}/roles`,
  permissions: `${BASE_URL}/permissions`,
};

export const PAGINATION_DEFAULTS = {
  page: 0,
  size: 20,
};