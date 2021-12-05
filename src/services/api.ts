import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const newApi = axios.create({
  baseURL: `${process.env.REACT_APP_NEW_API_URL}/v2`,
});

export default api;
