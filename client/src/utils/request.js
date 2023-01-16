import axios from 'axios';
const request = axios.create({
    baseURL: 'https://ecommerce-sern-production.up.railway.app/api',
});
export default request;
