import { auth } from '../../config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import notify from '../Toast';

// eslint-disable-next-line react-hooks/rules-of-hooks

const HandleSignIn = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
            navigate('/');
        })
        .catch((error) => {
            notify('error', 'Đăng nhập thất bại !');
        });
};
export default HandleSignIn;
