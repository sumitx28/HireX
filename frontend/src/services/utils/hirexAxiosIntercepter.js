import axios from 'axios';
import LocalStorageKey from './LocalStorageKey';
import { HIRE_X_API } from './ApiConstants';

const hirexAxios = axios.create({
    baseURL: HIRE_X_API
});

hirexAxios.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem(LocalStorageKey.JWTTOKEN) || null;
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default hirexAxios;