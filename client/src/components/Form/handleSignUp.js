import { auth } from '../../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import notify from '../Toast';
import axios from 'axios';
const HandleSignUp = (name, email, password, navigate) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
            console.log('Registered user', user);
            const data = {
                name,
                email,
                role: 0,
            };
            await axios.post('http://localhost:8080/api/user/add', data);

            notify('success', 'Tạo tài khoản thành công !');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        })
        .catch((error) => {
            notify('error', 'Tạo tài khoản thất bại !');
        });
};
export default HandleSignUp;
