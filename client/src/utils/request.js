import axios from 'axios';
const request = axios.create({
    baseURL: 'https://ecommerce-sern.vercel.app/api',
});
export default request;
