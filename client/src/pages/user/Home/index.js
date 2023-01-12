//Local
import Carousel from '../../../components/Carousel';
import BrandCarousel from '../../../components/BrandCarousel/BrandCarousel';
import banner from '../../../assets/img/banner4.webp';
import ship from '../../../assets/img/ship.webp';
import './Home.scss';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';
//Other
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigateSearch } from '../../../CustomHook';

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

    return (
        <div className="container page-content">
            <div className="row">
                <div className="col col-lg-12 col-xl-9 ">
                    <Carousel />
                </div>
                <div className="col col-xl-3 d-none d-sm-none d-md-none d-lg-none d-xl-block">
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
            <h5 style={{ fontWeight: '700', marginBottom: '0', marginTop: '8px' }}>Thương hiệu nổi bật</h5>
            <BrandCarousel />
            <ProductCarousel title="Laptop" />
            <ProductCarousel title="Điện thoại" />
            <ProductCarousel title="Máy tính bảng" />

            <div className="category-home">
                <h5 style={{ fontWeight: '700', marginBottom: 0 }}>Tất cả danh mục</h5>
                <div className="row row-cols-3 row-cols-md-5 row-cols-lg-5">
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
