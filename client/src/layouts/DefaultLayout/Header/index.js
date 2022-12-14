// local
import Style from './Header.module.scss';
import logoWeb from '../../../assets/img/logo.png';
import logoMobile from '../../../assets/icon/logoIcon.png';
import MenuItem from '../../../components/MenuItem';
import Search from '../../../components/Search';
// React
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useViewport, useNavigateSearch } from '../../../CustomHook';
import { MDBBtn } from 'mdb-react-ui-kit';
// Firebase
import { auth } from '../../../config/Firebase';
// Other
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';
import lottie from 'lottie-web';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { cartChange, getUser } from '../../../redux/actions/headerAction';

const cx = classNames.bind(Style);
function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const userIcon1 = useRef();
    const userIcon2 = useRef();
    const adminIcon1 = useRef();
    const adminIcon2 = useRef();
    const cartIcon1 = useRef();
    const cartIcon2 = useRef();
    const logoutIcon1 = useRef();
    const logoutIcon2 = useRef();
    const orderIcon1 = useRef();
    const orderIcon2 = useRef();
    const btnRef = useRef();
    const menuRef = useRef();

    const navigate = useNavigateSearch();
    const dispatch = useDispatch();
    const viewPort = useViewport();

    const isMobile = viewPort.width <= 739;
    const isTablet = viewPort.width > 739 && viewPort.width <= 992;
    const isPc = viewPort.width > 992;

    const user = useSelector((state) => state.headerState.user.name);
    const role = useSelector((state) => state.headerState.user.role);
    const cartQuantity = useSelector((state) => state.headerState.cartQuantity);

    const SignOut = () => {
        setTimeout(() => {
            auth.signOut().then(() => {
                navigate('/');
            });
        }, 500);
    };

    useEffect(() => {
        lottie.loadAnimation({
            name: 'admin1',
            container: adminIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../../assets/icon/admin.json'),
        });
        lottie.loadAnimation({
            name: 'admin2',
            container: adminIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/icon/admin.json'),
        });
        lottie.loadAnimation({
            name: 'user1',
            container: userIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../../assets/icon/account.json'),
        });
        lottie.loadAnimation({
            name: 'user2',
            container: userIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/icon/account.json'),
        });
        lottie.loadAnimation({
            name: 'cart1',
            container: cartIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../../assets/icon/cart.json'),
        });
        lottie.loadAnimation({
            name: 'cart2',
            container: cartIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/icon/cart.json'),
        });
        lottie.loadAnimation({
            name: 'logout1',
            container: logoutIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../../assets/icon/logout.json'),
        });
        lottie.loadAnimation({
            name: 'logout2',
            container: logoutIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/icon/logout.json'),
        });
        lottie.loadAnimation({
            name: 'order1',
            container: orderIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../../assets/icon/order.json'),
        });
        lottie.loadAnimation({
            name: 'order2',
            container: orderIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/icon/order.json'),
        });
        return () => {
            lottie.destroy();
        };
    }, [isMobile, isPc, isTablet, user]);

    useEffect(() => {
        //Check mobile ho???c tablet m???i set height cho menu
        if (menuRef.current) {
            if (isMobile || isTablet) {
                if (openMenu) {
                    menuRef.current.style.height = menuRef.current.scrollHeight + 4 + 'px';
                } else {
                    menuRef.current.style.height = 0;
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openMenu]);

    useEffect(() => {
        auth.onAuthStateChanged(async (res) => {
            if (!res) {
                dispatch(getUser());
            } else {
                dispatch(getUser(res.email));
            }
        });
        dispatch(cartChange());
    }, []);

    return (
        <nav className={cx('navbar navbar-light bg-light', 'navbar')}>
            <div className="container">
                <div className="navbar-collapse justify-content-between d-flex">
                    <div className={cx({ mobile: isMobile, tablet: isTablet, pc: isPc })}>
                        {isMobile || isTablet ? (
                            <img
                                src={logoMobile}
                                alt="logoMobile"
                                className={cx('logo')}
                                onClick={() => {
                                    navigate('/');
                                    setOpenMenu(false);
                                }}
                            />
                        ) : (
                            <img
                                src={logoWeb}
                                alt="logoWeb"
                                className={cx('logo')}
                                onClick={() => {
                                    navigate('/');
                                }}
                            />
                        )}
                        <Search />
                        {(isMobile && user) || (isTablet && user) ? (
                            <button
                                className={cx('btn', 'custom-btn')}
                                onClick={() => {
                                    setOpenMenu(!openMenu);
                                }}
                            >
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        ) : (
                            <HeadlessTippy
                                interactive
                                delay={[0, 700]}
                                placement="bottom-end"
                                hideOnClick="false"
                                render={(attrs) => (
                                    <div className={cx('menu')}>
                                        <Link to="/login">????ng nh???p</Link>
                                        <Link to="/register">????ng k??</Link>
                                    </div>
                                )}
                            >
                                <div className={cx('signin')}>
                                    <MDBBtn className={cx('btn', 'custom-btn')}>
                                        <div ref={userIcon1} className={cx('userIcon1')} />
                                        <div ref={userIcon2} className={cx('userIcon2')} />
                                    </MDBBtn>
                                </div>
                            </HeadlessTippy>
                        )}
                    </div>

                    {user ? (
                        <div
                            onClick={() => {
                                setOpenMenu(false);
                            }}
                            ref={menuRef}
                            className={cx('action', {
                                logged: user,
                                active: openMenu,
                            })}
                        >
                            <MenuItem content={`Hi,${user}`} placement="bottom" isPc={isPc}>
                                <div className={cx('action-item')}>
                                    <button className={cx('btn', 'custom-btn')}>
                                        <div ref={userIcon1} className={cx('userIcon1')} />
                                        <div ref={userIcon2} className={cx('userIcon2')} />
                                    </button>
                                    <span>Xin ch??o, {user}</span>
                                </div>
                            </MenuItem>
                            {role === 1 && (
                                <MenuItem content="Trang qu???n tr???" placement="bottom" isPc={isPc}>
                                    <div
                                        className={cx('action-item')}
                                        onClick={() => {
                                            navigate('/admin/dashboard');
                                        }}
                                    >
                                        <button className={cx('btn', 'custom-btn')} ref={btnRef}>
                                            <div ref={adminIcon1} className={cx('adminIcon1')} />
                                            <div ref={adminIcon2} className={cx('adminIcon2')} />
                                        </button>
                                        <span>Trang qu???n tr???</span>
                                    </div>
                                </MenuItem>
                            )}
                            <MenuItem content="????n h??ng" placement="bottom" isPc={isPc}>
                                <div
                                    className={cx('action-item')}
                                    onClick={() => {
                                        navigate('/order');
                                    }}
                                >
                                    <button className={cx('btn', 'custom-btn')} ref={btnRef}>
                                        <div ref={orderIcon1} className={cx('orderIcon1')} />
                                        <div ref={orderIcon2} className={cx('orderIcon2')} />
                                    </button>
                                    <span>????n h??ng</span>
                                </div>
                            </MenuItem>
                            <MenuItem content="Gi??? h??ng" placement="bottom" isPc={isPc}>
                                <div
                                    className={cx('action-item')}
                                    onClick={() => {
                                        navigate('/cart');
                                    }}
                                >
                                    <button className={cx('btn', 'custom-btn')} ref={btnRef}>
                                        <div ref={cartIcon1} className={cx('cartIcon1')} />
                                        <div ref={cartIcon2} className={cx('cartIcon2')} />
                                        <span className={cx('quantity')}>{cartQuantity}</span>
                                    </button>
                                    <span>Gi??? h??ng</span>
                                </div>
                            </MenuItem>

                            <MenuItem content="????ng xu???t" placement="bottom" isPc={isPc}>
                                <div className={cx('action-item')}>
                                    <button className={cx('btn', 'custom-btn')} onClick={SignOut}>
                                        <div ref={logoutIcon1} className={cx('logoutIcon1')} />
                                        <div ref={logoutIcon2} className={cx('logoutIcon2')} />
                                    </button>
                                    <span>????ng xu???t</span>
                                </div>
                            </MenuItem>
                        </div>
                    ) : (
                        <div className={cx('authentication')}>
                            <MDBBtn rounded className={cx('btn-login')} color="link" rippleColor="light">
                                <Link to="/login">????ng nh???p</Link>
                            </MDBBtn>
                            <MDBBtn rounded className={cx('btn-register')}>
                                <Link to="/register">????ng k??</Link>
                            </MDBBtn>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
