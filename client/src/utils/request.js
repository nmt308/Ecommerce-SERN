import axios from 'axios';
const request = axios.create({
    // 'https://nowshop-ecommerce.onrender.com/api'
    // 'http://localhost:8080/'
    baseURL: 'https://nowshop-ecommerce.onrender.com/api',
});
export default request;
