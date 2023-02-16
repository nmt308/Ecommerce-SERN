//Local
import CustomButton from './CustomButton';
import Style from './ProductCarousel.module.scss';
import ProductItem from '../ProductItem';
import SkeletonLoading from '../ProductItem/SkeletonLoading';
//Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//React
import { useNavigateSearch } from '../../CustomHook';
import { useEffect, useState } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
//Other
import request from '../../utils/request';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);
function ProductCarousel({ title }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateSearch = useNavigateSearch();

    const handleSeeAll = () => {
        navigateSearch(`/search/category`, { type: title });
    };

    useEffect(() => {
        const getProduct = async () => {
            request
                .get('/search', {
                    params: {
                        type: title,
                    },
                })
                .then((data) => {
                    setProducts(data.data.result);
                    setLoading(false);
                });
        };
        getProduct();
    }, []);
    const renderProducts = () => {
        if (products.length > 0 && !loading) {
            return Array.from(Array(10)).map((item) => <SkeletonLoading width="95%" />);
        }
        if (products.length === 0) {
            if (loading) {
                return Array.from(Array(10)).map((item) => <SkeletonLoading width="95%" />);
            } else {
                return <div className="w-100 mt-5 text-center">Lỗi bất định thử lại sau</div>;
            }
        }
    };
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
                    // autoPlay
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
                    {renderProducts()}
                </Carousel>
            </div>
        </div>
    );
}

export default ProductCarousel;
