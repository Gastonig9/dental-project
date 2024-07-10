import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const token = localStorage.getItem('token');

apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

apiClient.interceptors.request.use(
  (config) => {
    if (config.headers['Remove-Authorization']) {
      delete config.headers['Authorization'];
      delete config.headers['Remove-Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { apiClient };
