import './Login.scss';
import Form from '../../../components/Form';
import { useEffect } from 'react';
import { auth } from '../../../config/Firebase';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../redux/actions/headerAction';
function Login() {
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged(async (res) => {
            if (!res) {
                dispatch(getUser());
            } else {
                dispatch(getUser(res.email));
            }
        });
    }, []);
    return <Form type="login" />;
}

export default Login;
