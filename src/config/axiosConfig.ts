import axios from 'axios';

const defaultAxios = axios.create();

defaultAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default defaultAxios;
