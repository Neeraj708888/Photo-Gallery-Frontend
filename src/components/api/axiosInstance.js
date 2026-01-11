import axios from "axios";
import { API_URL } from "../../features/admin/adminAPI";
import { getToken } from "../utils/AuthToken";

const axiosInstance = axios.create({
  baseURL: API_URL,
  // baseURL: "https://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
