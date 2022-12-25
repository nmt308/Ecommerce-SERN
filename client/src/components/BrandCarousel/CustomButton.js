import classNames from 'classnames/bind';
import Style from './BrandCarousel.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const cx = classNames.bind(Style);
const CustomButton = ({ next, previous, goToSlide, ...rest }) => {
    const {
        carouselState: { currentSlide },
    } = rest;
    return (
        <div className={cx('carousel-button-group')}>
            <button
                className={cx('btn', 'custom-btn', {
                    disable: currentSlide === 0,
                })}
                onClick={() => previous()}
            >
                <FaChevronLeft />
            </button>
            <button
                className={cx('btn', 'custom-btn', {
                    disable: currentSlide === 2,
                })}
                onClick={() => next()}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};
export default CustomButton;
