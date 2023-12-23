// axiosConfig.js

import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const bearerToken = process.env.REACT_APP_TOKEN;


const api = axios.create({
  baseURL: baseURL,
});

export const authenticatedApi = axios.create({
  baseURL: 'https://api.blog.redberryinternship.ge/api',
  headers: {
    Authorization: `Bearer ${bearerToken}`,
    // Add other default headers if needed
  },
});

export default api;
