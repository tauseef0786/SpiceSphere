import axios from 'axios'

const baseUrl = "https://spice-sphere.vercel.app/api/"; // api link 
 
export const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': "application/json"
    }
})

apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );