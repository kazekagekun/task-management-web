import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'http://localhost:3000/api',
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
