//Local
import Style from './SideMenu.scss';
import logo1 from '../../../assets/icon/logo1.png';
//Other
import classNames from 'classnames/bind';
//React
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSpaceDashboard, MdNightlightRound, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { SlSocialDropbox } from 'react-icons/sl';
import { FiSun } from 'react-icons/fi';
import { TbReportMoney, TbDiscount2 } from 'react-icons/tb';
import { BiCategory, BiCheckShield, BiNews, BiUser, BiCommentCheck } from 'react-icons/bi';
import { useViewport } from '../../../CustomHook';

const cx = classNames.bind(Style);
function SideMenu() {
    const [dark, setDark] = useState(false);
    const [search, setSearch] = useState(null);
    const [open, setOpen] = useState(false);

    const viewPort = useViewport();
    const breakPoint = viewPort.width <= 1250;
    const handleSearch = (value) => {
        if (!value) {
            setSearch(null);
        } else {
            setSearch(value);
        }
    };
    const handleSideMenu = () => {
        setOpen(!open);
    };
    // console.log('side menu', );
    return (
        <>
            {console.log('side menu', breakPoint)}
            {!open && (
                <div className="sidemenu-bar" onClick={handleSideMenu}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            )}

            <nav
                className={cx('sidebar', {
                    dark: dark,
                    open: breakPoint && open,
                    close: breakPoint && !open,
                })}
            >
                <header>
                    <div className={cx('image-text')}>
                        <span className={cx('image')}>
                            <img src={logo1} alt="logo" />
                        </span>

                        <div className={cx('text logo-text')}>
                            <span className={cx('name')}>NowShop</span>
                            <span className={cx('profession')}>Management</span>
                        </div>
                        <MdOutlineKeyboardArrowRight
                            size={12}
                            className={cx('toggle')}
                            onClick={() => {
                                setOpen(!open);
                            }}
                        />
                    </div>
                </header>

                <div className={cx('menu-bar')}>
                    <div className={cx('menu')}>
                        <li className={cx('search-box')}>
                            <FiSearch className={cx('icon')} />
                            <input
                                type="text"
                                placeholder="T??m ki???m..."
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                            />
                        </li>

                        <ul className={cx('menu-links')}>
                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'Th???ng k??'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/dashboard">
                                    <MdOutlineSpaceDashboard className={cx('icon')} />
                                    <span className={cx('text nav-text')}>Th???ng k??</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'S???n ph???m'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/product">
                                    <SlSocialDropbox className={cx('icon')} />
                                    <span className={cx('text nav-text')}>S???n ph???m</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'Danh m???c'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/category">
                                    <BiCategory className={cx('icon')} />
                                    <span className={cx('text nav-text')}>Danh m???c</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'Th????ng hi???u'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/brand">
                                    <BiCheckShield className={cx('icon')} />
                                    <span className={cx('text nav-text')}>Th????ng hi???u</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'????n h??ng'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/order">
                                    <TbReportMoney className={cx('icon')} />
                                    <span className={cx('text nav-text')}>????n h??ng</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'Tin t???c'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/news">
                                    <BiNews className={cx('icon')} />
                                    <span className={cx('text nav-text')}>Tin t???c</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'Khuy???n m??i'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/banner">
                                    <TbDiscount2 className={cx('icon')} />
                                    <span className={cx('text nav-text')}>Khuy???n m??i</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'????nh gi??'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/feedback">
                                    <BiCommentCheck className={cx('icon')} />
                                    <span className={cx('text nav-text')}>????nh gi??</span>
                                </NavLink>
                            </li>

                            <li
                                className={cx('nav-link', {
                                    'd-none': search && !'T??i kho???n'.toLowerCase().includes(search.toLowerCase()),
                                })}
                            >
                                <NavLink to="/admin/account">
                                    <BiUser className={cx('icon')} />
                                    <span className={cx('text nav-text')}>T??i kho???n</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('bottom-content')}>
                        <li className={cx('mode')}>
                            <div className={cx('sun-moon')}>
                                <MdNightlightRound className={cx('icon moon')} />
                                <FiSun className={cx('icon sun')} />
                            </div>
                            <span className={cx('mode-text text')}>{dark ? 'Dark mode' : 'Light mode'}</span>

                            <div
                                className={cx('toggle-switch')}
                                onClick={() => {
                                    setDark(!dark);
                                }}
                            >
                                <span className={cx('switch')}></span>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default SideMenu;
