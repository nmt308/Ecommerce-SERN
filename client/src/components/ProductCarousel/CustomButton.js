import classNames from 'classnames/bind';
import Style from './ProductCarousel.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useViewport } from '../../CustomHook';

const cx = classNames.bind(Style);
const CustomButton = ({ type, onClick, ...rest }) => {
    const viewPort = useViewport();

    const isMobile = viewPort.width <= 739;

    const {
        onMove,
        carouselState: { currentSlide, deviceType },
    } = rest;

    return (
        !isMobile && (
            <button
                className={cx('btn', {
                    customLeft: type === 'left',
                    customRight: type === 'right',
                })}
                onClick={() => onClick()}
            >
                {type === 'left' ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
        )
    );
};
export default CustomButton;
