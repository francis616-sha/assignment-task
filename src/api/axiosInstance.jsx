import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
