//Local
import Carousel from '../../../components/Carousel';
import BrandCarousel from '../../../components/BrandCarousel/BrandCarousel';
import { useViewport } from '../../../CustomHook';
import banner from '../../../assets/img/banner4.webp';
import ship from '../../../assets/img/ship.webp';
import './Home.scss';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';

//Other
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNavigateSearch } from '../../../CustomHook';
const cx = classNames;
function Home() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigateSearch();
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/categories', {
                params: {
                    getAll: 'true',
                },
            })
            .then((res) => {
                setCategories(res.data.categories);
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    //Open category

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 739;

    return (
        <div className="container page-content">
            <div className="row">
                <div className="col col-lg-9 ">
                    <Carousel />
                </div>
                <div className="col col-lg-3 d-none d-sm-none d-md-block">
                    <div className="policy-list">
                        <div className="policy-item">
                            <p>Bảo hành tận tâm</p>
                            <span>NowShop luôn cam kết sẽ hỗ trợ khách hàng mọi vấn đề.</span>
                        </div>
                        <div className="policy-item">
                            <p>Miễn phí vận chuyển</p>
                            <span>100% đơn hàng đều được miễn phí vận chuyển khi thanh toán trước.</span>
                        </div>
                        <div className="policy-item">
                            <p>Đổi trả 1-1 hoặc hoàn tiền</p>
                            <span>Nếu phát sinh lỗi hoặc sản phẩm chưa đáp ứng được nhu cầu.</span>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src={ship}
                alt="banner"
                className="banner"
                onClick={() => {
                    navigate('/notification');
                }}
            />
            <h5 style={{ fontWeight: '700', marginBottom: '16px', marginTop: '8px' }}>Thương hiệu nổi bật</h5>
            <BrandCarousel />
            <ProductCarousel title="Laptop" />
            <ProductCarousel title="Điện thoại" />
            <ProductCarousel title="Máy tính bảng" />

            <div className="category-home">
                <h5 style={{ fontWeight: '700', marginBottom: 0 }}>Tất cả danh mục</h5>
                <div className="row row-cols-5">
                    {categories.map((category, index) => {
                        return (
                            <div className="col" key={index}>
                                <div
                                    className="category-item"
                                    onClick={() => {
                                        navigate('/search/category', {
                                            type: category.name,
                                        });
                                    }}
                                >
                                    <div className="category-image">
                                        <img src={category.image} alt="categoryimage" width={60} height={60} />
                                    </div>
                                    <div className="category-title">{category.name}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <img src={banner} alt="banner" className="banner" />
        </div>
    );
}

export default Home;
