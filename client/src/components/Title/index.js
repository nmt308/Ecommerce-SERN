import classNames from 'classnames/bind';
import Style from './Title.module.scss';
const cx = classNames.bind(Style);
function Title({ name }) {
    return <div className={cx('title')}>{name}</div>;
}

export default Title;
