import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomButton from './CustomButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Style from './BrandCarousel.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(Style);
function BrandCarousel() {
    const [brands, setBrands] = useState([]);
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
        <div
            style={{
                position: 'relative',
            }}
        >
            <div style={{ maxWidth: 'calc(100% - 120px)' }}>
                <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
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
                            items: 9,
                            partialVisibilityGutter: 1,
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
                    slidesToSlide={2}
                    swipeable
                >
                    {brands.map((brand) => {
                        return (
                            <div className={cx('card-item')}>
                                {brand.name === 'Apple' ||
                                brand.name === 'Xiaomi' ||
                                brand.name === 'Dell' ||
                                brand.name === 'LG' ? (
                                    <img src={brand.image} alt="brand" style={{ width: '75%', padding: '0 20px' }} />
                                ) : (
                                    <img src={brand.image} alt="brand" style={{ width: '100%', padding: '0 15px' }} />
                                )}
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    );
}

export default BrandCarousel;
