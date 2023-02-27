import axios from 'axios';
const request = axios.create({
    // 'https://nowshop-ecommerce.onrender.com/api'
    // 'http://localhost:8080/'
    baseURL: 'http://localhost:8080/api',
});
export default request;
