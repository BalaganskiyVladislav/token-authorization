import axios, {Axios} from 'axios';

export const API: Axios = axios.create({
    baseURL: `/`,
    withCredentials: true,
})
