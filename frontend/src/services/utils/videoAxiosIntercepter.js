import axios from 'axios';
import LocalStorageKey from './LocalStorageKey';
import { VIDEO_INTERVIEW_REST_API } from './ApiConstants';

const videoInterviewAxios = axios.create({
    baseURL: VIDEO_INTERVIEW_REST_API
});

videoInterviewAxios.interceptors.request.use(
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

export default videoInterviewAxios;