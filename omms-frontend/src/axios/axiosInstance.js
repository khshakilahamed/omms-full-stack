import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

// Create an Axios instance with default configuration
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true, // Include credentials in the request
  headers: {
    Authorization: getFromLocalStorage(authKey)
  }
});