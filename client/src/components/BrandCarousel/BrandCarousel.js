//Local
import CustomButton from './CustomButton';
import Style from './BrandCarousel.module.scss';
//Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';

//React
import { useEffect, useState } from 'react';
import useNavigateSearch from '../../CustomHook/useNavigateSearch';
//Other
import classNames from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { useViewport } from '../../CustomHook';
import request from '../../utils/request';

const cx = classNames.bind(Style);
function BrandCarousel() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateSearch = useNavigateSearch();

    const handleNavigate = (nameBrand) => {
        navigateSearch('/search/brand', { brand: nameBrand });
    };
    const viewPort = useViewport();

    const mobileL = viewPort.width <= 426;
    const tabletS = viewPort.width > 426 && viewPort.width <= 525;
    const tabletM = viewPort.width > 525 && viewPort.width <= 767;
    const tabletL = viewPort.width > 767 && viewPort.width <= 991;
    const laptop = viewPort.width > 991 && viewPort.width <= 1025;

    let slidesPerView;
    if (mobileL) {
        slidesPerView = 3;
    }
    if (tabletS) {
        slidesPerView = 3;
    }
    if (tabletM) {
        slidesPerView = 4;
    }
    if (tabletL) {
        slidesPerView = 5;
    }
    if (laptop) {
        slidesPerView = 6;
    }

    const isMobile = viewPort.width <= 739;
    const isTablet = viewPort.width > 739 && viewPort.width <= 1024;
    const isPc = viewPort.width > 1024;
    useEffect(() => {
        const getBrand = async () => {
            request
                .get('/brands', {
                    params: {
                        getAll: 'true',
                    },
                })
                .then((data) => {
                    setBrands(data.data.brands);
                });
        };
        getBrand();
    }, []);

    return (
        <>
            {(isMobile || isTablet) && (
                <Swiper
                    modules={[Grid]}
                    grid={{
                        rows: 2,
                        fill: 'row',
                    }}
                    slidesPerView={slidesPerView}
                >
                    {' '}
                    {brands.map((brand) => {
                        return (
                            <SwiperSlide>
                                <div
                                    className={cx('card-item')}
                                    key={brand.id}
                                    onClick={() => {
                                        handleNavigate(brand.name);
                                    }}
                                >
                                    {loading && (
                                        <Skeleton className={cx('skeleton')} width={120} height={80}></Skeleton>
                                    )}
                                    {brand.name === 'Apple' ||
                                    brand.name === 'Xiaomi' ||
                                    brand.name === 'Dell' ||
                                    brand.name === 'LG' ? (
                                        <img
                                            src={brand.image}
                                            alt="brand-logo"
                                            style={{ width: '75%', padding: '0 20px' }}
                                            onLoad={() => {
                                                setLoading(false);
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={brand.image}
                                            alt="brand-text"
                                            style={{ width: '100%', padding: '0 15px' }}
                                            onLoad={() => {
                                                setLoading(false);
                                            }}
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
            {isPc && (
                <div style={{ position: 'relative' }}>
                    <Carousel
                        additionalTransfrom={0}
                        arrows={false}
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className={cx('custom')}
                        containerClass="container-padding-bottom"
                        customButtonGroup={<CustomButton totalItems={brands.length} />}
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite={false}
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside
                        renderDotsOutside={false}
                        responsive={{
                            desktopM: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1200,
                                },
                                items: 8,
                                partialVisibilityGutter: 40,
                            },
                            desktopS: {
                                breakpoint: {
                                    max: 1199,
                                    min: 1024,
                                },
                                items: 6,
                                partialVisibilityGutter: 40,
                            },
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {brands.map((brand) => {
                            return (
                                <div
                                    className={cx('card-item')}
                                    key={brand.id}
                                    onClick={() => {
                                        handleNavigate(brand.name);
                                    }}
                                >
                                    {loading && <Skeleton width={120} height={80}></Skeleton>}
                                    {brand.name === 'Apple' ||
                                    brand.name === 'Xiaomi' ||
                                    brand.name === 'Dell' ||
                                    brand.name === 'LG' ? (
                                        <img
                                            src={brand.image}
                                            alt="brand"
                                            style={{ width: '75%', padding: '0 20px' }}
                                            onLoad={() => {
                                                setLoading(false);
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={brand.image}
                                            alt="brand"
                                            style={{ width: '100%', padding: '0 15px' }}
                                            onLoad={() => {
                                                setLoading(false);
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            )}
        </>
    );
}

export default BrandCarousel;
