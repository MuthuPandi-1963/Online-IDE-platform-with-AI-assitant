import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL
const axiosInstance = axios.create({
    baseURL :URL,
    withCredentials:true
})

export default axiosInstance;