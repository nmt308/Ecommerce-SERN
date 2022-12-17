//Local
import Carousel from '../../../components/Carousel';
import MultipleCarousel from '../../../components/MultipleCarousel/MultipleCarousel';
import { useViewport } from '../../../CustomHook';
import banner from '../../../assets/img/banner4.webp';
import './Home.scss';

//Other
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

const cx = classNames;
function Home() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [active, setActive] = useState('all');
    const [open, setOpen] = useState(false);

    // Paginate items
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState({ current: '' });

    // Categories list

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    //Open category
    const handleMenu = (event) => {
        setOpen(!open);
    };

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
            <MultipleCarousel />
        </div>
    );
}

export default Home;
