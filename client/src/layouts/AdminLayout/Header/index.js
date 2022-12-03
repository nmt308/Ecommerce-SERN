import Style from './Header.module.scss';
import classNames from 'classnames/bind';
import avatar from '../../../assets/img/avt.png';

const cx = classNames.bind(Style);
function Header() {
    return (
        <div className={cx('header')}>
            <img src={avatar} alt="" />
        </div>
    );
}

export default Header;
