// axiosConfig.js

import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const bearerToken = process.env.REACT_APP_TOKEN;


const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const authenticatedApi = axios.create({
  baseURL: 'https://api.blog.redberryinternship.ge/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${bearerToken}`,
  },
});

export default api;
