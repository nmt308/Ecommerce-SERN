//Local
import Style from './ProductDetail.module.scss';
import ModalSeeDetail from '../../../components/Modal/ModalSeeDetail';
//React
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { MDBBtn } from 'mdb-react-ui-kit';
import { HiChevronDoubleRight } from 'react-icons/hi';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { cartChange } from '../../../redux/actions/headerAction';
//Toastify
import notify from '../../../components/Toast';
import { ToastContainer } from 'react-toastify';
//Other
import classNames from 'classnames/bind';
import axios from 'axios';
import parse from 'html-react-parser';

const cx = classNames.bind(Style);
function ProductDetail() {
    const [product, setProduct] = useState('');
    const [basicModal, setBasicModal] = useState(false);
    const [imageCurrent, setImageCurrent] = useState(0);
    const [qty, setQty] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.headerState.user);

    const name = searchParams.get('name');
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    const toggleShow = () => setBasicModal(!basicModal);

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

    const addToCart = async (idProduct) => {
        if (!user.email) {
            alert('Vui lòng đăng nhập');
            navigate('/login');
            return;
        }
        if (product.quantity === 0) {
            notify('warning', 'Sản phẩm tạm hết hàng !');
            return;
        }
        if (qty > product.quantity) {
            notify('warning', `Tối đa ${product.quantity} sản phẩm !`);
            return;
        }
        if (cart.filter((product) => product.id === idProduct).length > 0) {
            notify('error', 'Đã có trong giỏ hàng !');
        } else {
            cart.push({ id: idProduct, quantity: qty });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(cartChange());
            notify('success', 'Thêm thành công !');
        }
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
                                <h2 className={cx('title')}>{product.name}</h2>
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
                                    {product.quantity > 0 ? (
                                        <dd className="col-sm-9">Còn hàng ( {product.quantity} còn lại )</dd>
                                    ) : (
                                        <dd className="col-sm-9">Hết hàng</dd>
                                    )}
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

                                    <MDBBtn
                                        className={cx('btn')}
                                        onClick={() => {
                                            addToCart(product.id);
                                        }}
                                    >
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
