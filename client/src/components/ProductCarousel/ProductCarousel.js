import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomButton from './CustomButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Style from './ProductCarousel.module.scss';
import classNames from 'classnames/bind';
import { HiChevronDoubleRight } from 'react-icons/hi';
const cx = classNames.bind(Style);
function ProductCarousel({ title }) {
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
                marginTop: '16px',
            }}
        >
            <div className={cx('title')}>
                <h5>{title}</h5>
                <div>
                    Xem thêm
                    <HiChevronDoubleRight />
                </div>
            </div>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
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
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024,
                        },
                        items: 5,
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
                slidesToSlide={1}
                swipeable
            >
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="s" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="s" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="s" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="s" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="s" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="s" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="s" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
            </Carousel>
        </div>
    );
}

export default ProductCarousel;
