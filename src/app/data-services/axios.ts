import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuth0Session } from '../local-storage/auth0-session';

export function getOptions(options: AxiosRequestConfig) {
    let token = getAuth0Session();

    if (options == null) {
        options = {};
    }

    if (options.headers == null) {
        options.headers = {};
    }

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };
    return options;
}

export const request = (option: AxiosRequestConfig) => {
    const options = getOptions(option);

    return axios(options);
};
