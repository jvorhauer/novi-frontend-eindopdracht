import axios from 'axios';
import config from '../config.json';

const maxios = axios.create(
  { baseURL: config.backend, }
);

maxios.interceptors.response.use((response) => response, (error) => {
  window.location = 'signin';
});

export default maxios;
