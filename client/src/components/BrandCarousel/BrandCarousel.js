//Local
import CustomButton from './CustomButton';
import Style from './BrandCarousel.module.scss';
//Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//React
import { useEffect, useState } from 'react';
import useNavigateSearch from '../../CustomHook/useNavigateSearch';
//Other
import axios from 'axios';
import classNames from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(Style);
function BrandCarousel() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateSearch = useNavigateSearch();

    const handleNavigate = (nameBrand) => {
        navigateSearch('/search/brand', { brand: nameBrand });
    };

    useEffect(() => {
        const getBrand = async () => {
            axios
                .get('http://localhost:8080/api/brands', {
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
        <div style={{ position: 'relative' }}>
            <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlaySpeed={3000}
                centerMode={false}
                className={cx('custom')}
                containerClass="container-padding-bottom"
                customButtonGroup={<CustomButton />}
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
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024,
                        },
                        items: 8,
                        partialVisibilityGutter: 40,
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464,
                        },
                        items: 2,
                        partialVisibilityGutter: 30,
                    },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={3}
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
    );
}

export default BrandCarousel;
