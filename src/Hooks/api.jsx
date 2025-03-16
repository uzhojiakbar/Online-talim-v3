import axios from "axios";
import { getCookie } from "./getCooce";
export const instance = axios.create({
  baseURL: "http://37.27.215.130:5013",
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request xatosi:", error);
    return Promise.reject(error);
  }
);
