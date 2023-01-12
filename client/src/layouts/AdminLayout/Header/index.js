import Style from './Header.module.scss';
import classNames from 'classnames/bind';
import avatar from '../../../assets/img/avt.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../redux/actions/headerAction';
import { auth } from '../../../config/Firebase';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import { useViewport } from '../../../CustomHook';
const cx = classNames.bind(Style);
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const viewPort = useViewport();
    const isMobile = viewPort.width < 650;

    useEffect(() => {
        if (isMobile) {
            navigate('/Admin/NotFound');
        }
    }, []);

    const SignOut = () => {
        setTimeout(() => {
            auth.signOut().then(() => {
                navigate('/');
            });
        }, 500);
    };

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
            <HeadlessTippy
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('tippy')}>
                        <Link to="/">Về trang chủ</Link>
                        <Link onClick={SignOut}>Đăng xuất</Link>
                    </div>
                )}
            >
                <div className="d-block" style={{ marginLeft: 'auto' }}>
                    <img src={avatar} alt="" />{' '}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Header;
