import Cookies from 'js-cookie';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://webcomics-be.fwh.is',
        'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': 'Content-Range, X-Content-Range'
    }
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosClient;
