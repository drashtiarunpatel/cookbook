import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://private-anon-2ed9b90000-cookbook3.apiary-proxy.com/',
});

export default instance;