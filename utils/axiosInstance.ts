import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_BASE_URL,   
    headers: {
    'Content-Type': 'application/json',
    },
});

export default axiosInstance;