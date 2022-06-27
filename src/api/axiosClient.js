import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
});

axiosClient.interceptors.request.use(
    // Do something before request is sent
    async (config) => config,
    // Do something with request error
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    // Do something with response data
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    // Do something with response error
    (error) => {
        throw error;
    });

export default axiosClient;