import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  get: async <T>(endpoint: string, token: string): Promise<T> => {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  },

  post: async <T>(endpoint: string, data: any, token: string): Promise<T> => {
    const response = await axios.post(`${API_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  },

  put: async <T>(endpoint: string, data: any, token: string): Promise<T> => {
    const response = await axios.put(`${API_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  },

  delete: async <T>(endpoint: string, token: string): Promise<T> => {
    const response = await axios.delete(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  },
};
