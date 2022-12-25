//Local
import Carousel from '../../../components/Carousel';
import BrandCarousel from '../../../components/BrandCarousel/BrandCarousel';
import { useViewport } from '../../../CustomHook';
import banner from '../../../assets/img/banner4.webp';
import './Home.scss';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';

//Other
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const cx = classNames;
function Home() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [active, setActive] = useState('all');

    // Categories list

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
                            <span>Bất kể giấy tờ thế nào, NowShop luôn cam kết sẽ hỗ trợ khách hàng tới cùng.</span>
                        </div>
                        <div className="policy-item">
                            <p>Miễn phí vận chuyển</p>
                            <span>100% đơn hàng đều được miễn phí vận chuyển khi thanh toán trước.</span>
                        </div>
                        <div className="policy-item">
                            <p>Đổi trả 1-1 hoặc hoàn tiền</p>
                            <span>Nếu phát sinh lỗi hoặc bạn cảm thấy sản phẩm chưa đáp ứng được nhu cầu.</span>
                        </div>
                    </div>
                </div>
            </div>
            <img src={banner} alt="banner" className="banner" />
            <h5 style={{ fontWeight: '700', marginBottom: '16px', marginTop: '8px' }}>Thương hiệu nổi bật</h5>
            <BrandCarousel />
            <ProductCarousel title="Laptop" />
            <ProductCarousel title="Điện thoại" />
        </div>
    );
}

export default Home;
