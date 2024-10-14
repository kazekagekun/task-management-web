import Axios from 'axios';
import { clearTokens, getRefreshToken, setTokens } from './auth';
import { navigateToLogin } from '../utils/navigateToLogin';
import { env } from '../config/env';

export const api = Axios.create({
  baseURL: env.API_URL,
});

const excludedUrls = ['/auth/refresh', '/auth/login', '/auth/logout'];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (
          originalRequest &&
          excludedUrls.some((url) => originalRequest.url?.includes(url))
        ) {
          return Promise.reject(error);
        }

        const refreshToken = getRefreshToken();
        const response = await api.post('/auth/refresh', {
          refreshToken,
        });

        const { accessToken } = response.data;
        setTokens(accessToken, refreshToken as string);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        api.defaults.headers.common['testUrl'] = `originalRequest.url`;
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
