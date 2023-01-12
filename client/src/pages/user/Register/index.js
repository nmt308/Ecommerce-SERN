import './Register.scss';
import Form from '../../../components/Form';
import { useEffect } from 'react';
import { auth } from '../../../config/Firebase';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../redux/actions/headerAction';

function Register() {
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
    return <Form type="register" />;
}

export default Register;
