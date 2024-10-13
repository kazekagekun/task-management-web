import Axios from 'axios';
import { clearTokens, getRefreshToken, setTokens } from './auth';
import { navigateToLogin } from '../utils/navigateToLogin';
import { env } from '../config/env';

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const response = await api.post('/auth/refresh', {
          refreshToken,
        });
        const { accessToken } = response.data;
        setTokens(accessToken, refreshToken as string);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        // Redirect to login or dispatch a logout action
        navigateToLogin();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
