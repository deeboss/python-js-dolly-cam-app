import axios from 'axios';

const axiosInstance = axios.create({
    // React auto set process.env.NODE_ENV to 'production' when run build
    baseURL: process.env.NODE_ENV === 'production' ? window.__REACT_APP_API_URL__ : process.env.REACT_APP_API_URL
})

export const request = (options = {}) => {
    axiosInstance.defaults.headers['Authorization'] = 'Token xxx';

    if (options.headers) {
        axiosInstance.defaults.headers = Object.assign({}, axiosInstance.defaults.headers, options.headers);
    }

    return axiosInstance
}

export const parseErrorResponse = (err) => err && err.response ? err.response.data : new Error('Bad request');
