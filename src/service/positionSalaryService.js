import axiosInstance, { API_URLS, PAGINATION_DEFAULTS } from "./axiosService";

const positionSalaryService = {
  async createPositionSalary(data) {
    try {
      const response = await axiosInstance.post(API_URLS.positionSalary, data);
      return response.data;
    } catch (error) {
      console.error("Error creating position salary:", error);
      throw error;
    }
  },

  async getPositionSalaries(
    page = PAGINATION_DEFAULTS.page,
    size = PAGINATION_DEFAULTS.size
  ) {
    try {
      const response = await axiosInstance.get(API_URLS.positionSalary, {
        params: { page, size },
      });
      return response.data;
        
    } catch (error) {
      console.error("Error getting position salaries:", error);
      throw error;
    }
  },

  async getPositionSalaryByName(
    position,
    page = PAGINATION_DEFAULTS.page,
    size = PAGINATION_DEFAULTS.size
  ) {
    try {
      const response = await axiosInstance.get(
        API_URLS.positionSalaryByPosition,
        {
          params: { position, page, size },
        }
      );
      console.log("Service - Getting position salary by name:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting position salary by name:", error);
      throw error;
    }
  },

  async getPositionSalaryByRole(
    roleName,
    page = PAGINATION_DEFAULTS.page,
    size = PAGINATION_DEFAULTS.size
  ) {
    try {
      const response = await axiosInstance.get(API_URLS.positionSalaryByRole, {
        params: { roleName, page, size },
      });
      console.log("Service - Getting position salary by role:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting position salary by role:", error);
      throw error;
    }
  },


  async getPositionSalaryById(id) {
    try {
      const response = await axiosInstance.get(`${API_URLS.positionSalary}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting position salary by id:", error);
      throw error;
    }
  },

  async updatePositionSalary(data) {
    try {
      const response = await axiosInstance.put(
        `${API_URLS.positionSalary}/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating position salary:", error);
      throw error;
    }
  },

  async deletePositionSalary(id) {
    try {
      const response = await axiosInstance.delete(
        `${API_URLS.positionSalary}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting position salary:", error);
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.message || "Error deleting position salary"
        );
      }
      throw new Error("Error deleting position salary");
    }
  },
};

export default positionSalaryService;
