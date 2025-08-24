import axios from 'axios';

const API_BASE_URL = 'http://localhost:5246';

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
