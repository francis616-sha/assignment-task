import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com", // Replace with your API URL
  timeout: 10000, // Optional: Request timeout (10 sec)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify request before sending it (e.g., add auth token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
