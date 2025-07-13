import axios from 'axios';
import { API_URL } from '../config-global.ts';

// ----------------------------------------------------------------------

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor to handle 401 errors (expired access token)
api.interceptors.response.use(
    (response) => response, // Return the response if it's successful
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent retry loops

            try {
                const { data } = await api.get(endpoints.auth.refreshToken);
                const newAccessToken = data.accessToken;

                localStorage.setItem('accessToken', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);

                localStorage.removeItem('accessToken');
            }
        }

        return Promise.reject(error);
    },
);

export default api;

// ----------------------------------------------------------------------

export const endpoints = {
    auth: {
        login: '/api/login',
        register: '/api/register',
        logout: '/api/logout',
        refreshToken: '/api/refresh-token',
        check: '/api/check',
    },
    reservations: {
        all: '/api/reservations',
        reservationDates: '/api/reservations/dates',
        myReservations: '/api/reservations/me',
    },
};
