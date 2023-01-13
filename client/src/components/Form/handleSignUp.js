import { auth } from '../../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import notify from '../Toast';
import request from '../../utils/request';
const HandleSignUp = (name, email, password, navigate) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
            const data = {
                name,
                email,
                role: 0,
            };
            await request.post('/user/add', data);

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
