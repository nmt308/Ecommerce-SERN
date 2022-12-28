//Local
import Style from './ProductDetail.module.scss';

//React
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
//Toastify
import notify from '../../../components/Toast';
import { ToastContainer } from 'react-toastify';
//Other
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import parse from 'html-react-parser';
import ModalSeeDetail from '../../../components/Modal/ModalSeeDetail';
import { HiChevronDoubleRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const cx = classNames.bind(Style);
function ProductDetail() {
    const [product, setProduct] = useState('');
    const [imageCurrent, setImageCurrent] = useState(0);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    const navigate = useNavigate();

    useEffect(() => {
        const getProductDetail = async () => {
            const res = await axios.get(`http://localhost:8080/api/product/detail`, {
                params: {
                    name: name,
                },
            });
            setProduct(res.data.product);
        };
        getProductDetail();
    }, []);
    console.log(product);

    const [qty, setQty] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const increaseQty = () => {
        setQty((qty) => qty + 1);
    };

    const decreaseQty = () => {
        if (qty < 2) {
            notify('error', 'Số lượng tối thiểu là 1 !');
            return;
        }
        setQty((qty) => qty - 1);
    };

    const addToCart = async () => {
        if (!localStorage.getItem('user')) {
            alert('Vui lòng đăng nhập');
            navigate('/login');
            return;
        }

        notify('success', 'Thêm thành công');
    };

    return (
        <div className={cx('section-content')}>
            <div className="container mt-4">
                <div className={cx('info')}>
                    <div className="row">
                        <aside className="col-md-6">
                            <div className={cx('image')}>
                                <div className={cx('image-slide')}>
                                    {product.image &&
                                        product.image.split(',').map((image, index) => {
                                            return (
                                                <>
                                                    <div
                                                        className={cx('image-slide-item', {
                                                            active: imageCurrent === index,
                                                        })}
                                                        key={image}
                                                        onClick={() => {
                                                            setImageCurrent(index);
                                                        }}
                                                    >
                                                        <img key={image} src={image} alt="product" />
                                                    </div>
                                                </>
                                            );
                                        })}
                                </div>
                                <div className={cx('image-display')}>
                                    <img
                                        src={product.image && product.image.split(',')[imageCurrent]}
                                        alt="ProductImage"
                                    />
                                </div>
                            </div>
                        </aside>
                        <main className="col-md-6">
                            <article className="product-info-aside">
                                <h2 className={cx('title', 'mt-3')}>{product.name}</h2>
                                <div className="mb-3">
                                    <h4>
                                        <NumericFormat
                                            value={product.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                        />
                                    </h4>
                                    <span className="text-decoration-line-through">
                                        <NumericFormat
                                            value={product.oldprice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                        />
                                    </span>
                                </div>

                                <dl className="row">
                                    <dt className="col-sm-3">Hãng sản xuất</dt>
                                    <dd className="col-sm-9">{product && product.Brand.name}</dd>

                                    <dt className="col-sm-3">Bảo hành</dt>
                                    <dd className="col-sm-9">2 năm</dd>

                                    <dt className="col-sm-3">Giao hàng</dt>
                                    <dd className="col-sm-9">2-4 ngày</dd>

                                    <dt className="col-sm-3">Tình trạng</dt>
                                    <dd className="col-sm-9">Còn hàng</dd>
                                </dl>

                                <div className="d-flex mt-4">
                                    <div className={cx('product-text', 'quantity-box')}>
                                        <div className={cx('action-btns', 'minus')} onClick={decreaseQty}>
                                            <button>-</button>
                                        </div>
                                        <div className={cx('qty')}>{qty}</div>
                                        <div className={cx('action-btns', 'plus')} onClick={increaseQty}>
                                            <button>+</button>
                                        </div>
                                    </div>

                                    <MDBBtn className={cx('btn')} onClick={addToCart}>
                                        <i className="fas fa-shopping-cart"></i>{' '}
                                        <span className="text">Thêm giỏ hàng</span>
                                    </MDBBtn>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
                <div className={cx('description')}>
                    <div className="row">
                        <div className={cx('col-lg-7', 'description-left')}>
                            <div>
                                <h5>Mô tả sản phẩm</h5>
                                {product && parse(product.description)}
                            </div>
                            <div className={cx('bg')}>
                                <MDBBtn rounded className={cx('btn')} onClick={toggleShow}>
                                    <span className="text">
                                        Xem chi tiết <HiChevronDoubleRight />{' '}
                                    </span>
                                </MDBBtn>
                            </div>
                        </div>
                        <div className={cx('col-lg-4', 'description-right')}>
                            <h5>Thông số kĩ thuật</h5>
                            {product && parse(product.specification)}
                        </div>
                    </div>
                </div>
            </div>
            <ModalSeeDetail
                basicModal={basicModal}
                setBasicModal={setBasicModal}
                toggleShow={toggleShow}
                data={product && parse(product.description)}
            />
            <ToastContainer />
        </div>
    );
}

export default ProductDetail;
