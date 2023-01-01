import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomButton from './CustomButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Style from './ProductCarousel.module.scss';
import classNames from 'classnames/bind';
import { HiChevronDoubleRight } from 'react-icons/hi';
import ProductItem from '../ProductItem';
import { useNavigateSearch } from '../../CustomHook';
const cx = classNames.bind(Style);
function ProductCarousel({ title }) {
    const [products, setProducts] = useState([]);
    const navigateSearch = useNavigateSearch();

    let type;
    if (title === 'Laptop') {
        type = 'laptop';
    } else {
        type = 'phone';
    }

    const handleSeeAll = () => {
        navigateSearch(`/search/category`, { type: type });
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
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    partialVisible={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024,
                            },
                            items: 5,
                            partialVisibilityGutter: 15,
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
