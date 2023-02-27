import axios from 'axios';
const request = axios.create({
    baseURL: 'https://nowshop-ecommerce.onrender.com/api',
});
export default request;
