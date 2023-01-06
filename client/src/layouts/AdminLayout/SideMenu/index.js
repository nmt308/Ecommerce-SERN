import Style from './SideMenu.scss';
import logo1 from '../../../assets/icon/logo1.png';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSpaceDashboard, MdOutlineKeyboardArrowRight, MdNightlightRound } from 'react-icons/md';
import { SlSocialDropbox } from 'react-icons/sl';
import { FiSun } from 'react-icons/fi';
import { TbReportMoney, TbDiscount2 } from 'react-icons/tb';
import { BiCategory, BiCheckShield, BiNews, BiUser, BiCommentCheck } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(Style);

function SideMenu() {
    const [dark, setDark] = useState(false);
    const [close, setClose] = useState(false);
    return (
        <nav
            className={cx('sidebar', {
                dark: dark,
                close: close,
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
                </div>

                <MdOutlineKeyboardArrowRight
                    size={12}
                    className={cx('toggle')}
                    onClick={() => {
                        setClose(!close);
                    }}
                />
            </header>

            <div className={cx('menu-bar')}>
                <div className={cx('menu')}>
                    <li className={cx('search-box')}>
                        <FiSearch className={cx('icon')} />
                        <input type="text" placeholder="Tìm kiếm..." />
                    </li>

                    <ul className={cx('menu-links')}>
                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/dashboard">
                                <MdOutlineSpaceDashboard className={cx('icon')} />
                                <span className={cx('text nav-text')}>Thống kê</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/product">
                                <SlSocialDropbox className={cx('icon')} />
                                <span className={cx('text nav-text')}>Sản phẩm</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/category">
                                <BiCategory className={cx('icon')} />
                                <span className={cx('text nav-text')}>Danh mục</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/brand">
                                <BiCheckShield className={cx('icon')} />
                                <span className={cx('text nav-text')}>Thương hiệu</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/order">
                                <TbReportMoney className={cx('icon')} />
                                <span className={cx('text nav-text')}>Đơn hàng</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/news">
                                <BiNews className={cx('icon')} />
                                <span className={cx('text nav-text')}>Tin tức</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/banner">
                                <TbDiscount2 className={cx('icon')} />
                                <span className={cx('text nav-text')}>Khuyến mãi</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/feedback">
                                <BiCommentCheck className={cx('icon')} />
                                <span className={cx('text nav-text')}>Đánh giá</span>
                            </NavLink>
                        </li>

                        <li className={cx('nav-link')}>
                            <NavLink to="/admin/account">
                                <BiUser className={cx('icon')} />
                                <span className={cx('text nav-text')}>Tài khoản</span>
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
    );
}

export default SideMenu;
