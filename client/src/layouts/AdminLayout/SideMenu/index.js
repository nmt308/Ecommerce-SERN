import Style from './SideMenu.scss';
import logo1 from '../../../assets/icon/logo1.png';
import classNames from 'classnames/bind';
import { useState } from 'react';
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

                <i
                    className={cx('bx bx-chevron-right toggle')}
                    onClick={() => {
                        setClose(!close);
                    }}
                ></i>
            </header>

            <div className={cx('menu-bar')}>
                <div className={cx('menu')}>
                    <li className={cx('search-box')}>
                        <i className={cx('bx bx-search icon')}></i>
                        <input type="text" placeholder="Search..." />
                    </li>

                    <ul className={cx('menu-links')}>
                        <li className={cx('nav-link')}>
                            <a>
                                <i className={cx('bx bx-home-alt icon')}></i>
                                <span className={cx('text nav-text')}>Dashboard</span>
                            </a>
                        </li>

                        <li className={cx('nav-link')}>
                            <a>
                                <i className={cx('bx bx-bar-chart-alt-2 icon')}></i>
                                <span className={cx('text nav-text')}>Revenue</span>
                            </a>
                        </li>

                        <li className={cx('nav-link')}>
                            <a>
                                <i className={cx('bx bx-bell icon')}></i>
                                <span className={cx('text nav-text')}>Notifications</span>
                            </a>
                        </li>

                        <li className={cx('nav-link')}>
                            <a>
                                <i className={cx('bx bx-pie-chart-alt icon')}></i>
                                <span className={cx('text nav-text')}>Analytics</span>
                            </a>
                        </li>

                        <li className={cx('nav-link')}>
                            <a>
                                <i className={cx('bx bx-heart icon')}></i>
                                <span className={cx('text nav-text')}>Likes</span>
                            </a>
                        </li>

                        <li className={cx('nav-link')}>
                            <a>
                                <i className={cx('bx bx-wallet icon')}></i>
                                <span className={cx('text nav-text')}>Wallets</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={cx('bottom-content')}>
                    <li className={cx('')}>
                        <a>
                            <i className={cx('bx bx-log-out icon')}></i>
                            <span className={cx('text nav-text')}>Logout</span>
                        </a>
                    </li>

                    <li className={cx('mode')}>
                        <div className={cx('sun-moon')}>
                            <i className={cx('bx bx-moon icon moon')}></i>
                            <i className={cx('bx bx-sun icon sun')}></i>
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
