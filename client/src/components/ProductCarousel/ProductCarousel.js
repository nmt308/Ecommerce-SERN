//Local
import CustomButton from './CustomButton';
import Style from './ProductCarousel.module.scss';
import ProductItem from '../ProductItem';
//Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//React
import { useNavigateSearch, useViewport } from '../../CustomHook';
import { useEffect, useState } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
//Other
import axios from 'axios';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);
function ProductCarousel({ title }) {
    const [products, setProducts] = useState([]);
    const navigateSearch = useNavigateSearch();
    const viewPort = useViewport();
    const handleSeeAll = () => {
        navigateSearch(`/search/category`, { type: title });
    };

    useEffect(() => {
        const getProduct = async () => {
            axios
                .get('http://localhost:8080/api/products', {
                    params: {
                        limit: 8,
                    },
                })
                .then((data) => {
                    setProducts(data.data.products);
                });
        };
        getProduct();
    }, []);
    console.log(viewPort.width);
    return (
        <div>
            <div className={cx('title')}>
                <h5>{title}</h5>
                <div onClick={handleSeeAll}>
                    Xem thêm
                    <HiChevronDoubleRight />
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    marginTop: '16px',
                }}
            >
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className={cx('carousel')}
                    containerClass="container"
                    customLeftArrow={<CustomButton type="left" />}
                    customRightArrow={<CustomButton type="right" />}
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    autoPlay
                    infinite
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    partialVisible={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1200,
                            },
                            items: 5,
                            partialVisibilityGutter: 15,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1199,
                                min: 992,
                            },
                            items: 4,
                            partialVisibilityGutter: 30,
                        },
                        tabletSM: {
                            breakpoint: {
                                max: 989,
                                min: 767,
                            },
                            items: 3,
                            partialVisibilityGutter: 30,
                        },
                        mobile: {
                            breakpoint: {
                                max: 767,
                                min: 0,
                            },
                            items: 2,
                            partialVisibilityGutter: 30,
                        },
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay={true}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {products.map((product, index) => (
                        <ProductItem key={index} data={product} width="95%" />
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default ProductCarousel;
