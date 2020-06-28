import axios from 'axios';

export const baseApiURL = 'http://192.168.1.16:5000/api/v1';

const axiosInstance = axios.create({
    // React auto set process.env.NODE_ENV to 'production' when run build
    baseURL: process.env.NODE_ENV === 'production' ? 'http://192.168.1.16:5000/api/v1' : 'http://192.168.1.16:5000/api/v1'
})

export const request = (options = {}) => {
    return axiosInstance
}

export const parseErrorResponse = (err) => err && err.response ? err.response.data : new Error('Bad request');
