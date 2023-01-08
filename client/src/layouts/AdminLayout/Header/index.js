import Style from './Header.module.scss';
import classNames from 'classnames/bind';
import avatar from '../../../assets/img/avt.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../redux/actions/headerAction';
import { auth } from '../../../config/Firebase';

const cx = classNames.bind(Style);
function Header() {
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
    return (
        <div className={cx('header')}>
            <img src={avatar} alt="" />
        </div>
    );
}

export default Header;
