import axios from 'axios';
import authConfig from 'src/configs/auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_API + '/api';

// Tạo một instance của axios
const api = axios.create({
  baseURL: API_BASE_URL,
});
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(authConfig.storageTokenKeyName);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: any) => {
    console.log("error.message:", error);
    Promise.reject(error);
  }
);
const API = {
  loginTelegram: (userData: any) => {
    return api.post('/auth/login-telegram', { data: userData });
  },

  textToImage: (prompt: any) => {
    return api.post('/ai/text-to-image/queue', { prompt: prompt });
  },

  getUrlImage: (path: string) =>{
    return API_BASE_URL + path
  }
};

export default API;
