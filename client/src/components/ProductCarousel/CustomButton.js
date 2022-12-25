import classNames from 'classnames/bind';
import Style from './ProductCarousel.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const cx = classNames.bind(Style);
const CustomButton = ({ type, onClick, ...rest }) => {
    const {
        onMove,
        carouselState: { currentSlide, deviceType },
    } = rest;

    return (
        <button
            className={cx('btn', {
                customLeft: type === 'left',
                customRight: type === 'right',
            })}
            onClick={() => onClick()}
        >
            {type === 'left' ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
    );
};
export default CustomButton;
