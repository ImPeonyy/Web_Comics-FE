import Cookies from 'js-cookie';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://webcomics-be.fwh.is/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
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
