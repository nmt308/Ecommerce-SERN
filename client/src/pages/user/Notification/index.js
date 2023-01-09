import Notify from '../../../assets/img/notify2.png';
import Header from '../../../assets/img/header.png';
import Style from './Notification.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const cx = classNames.bind(Style);

function Notification() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={cx('container')}>
            <img src={Header} alt="header" style={{ width: '100%' }} />
            <div className={cx('body')}>
                <img src={Notify} alt="header" style={{ width: '60%' }} />
            </div>
        </div>
    );
}
export default Notification;
