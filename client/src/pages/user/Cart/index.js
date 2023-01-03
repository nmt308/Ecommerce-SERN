//Local
import CartItem from '../../../components/CartItem';

import payment from '../../../assets/img/payments.png';
import empty from '../../../assets/icon/emptyorder.png';
import Style from './Cart.scss';

//React
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../../components/Toast';
//Other
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { cartChange, getCartProduct } from '../../../redux/actions/headerAction';
import { HiOutlineTicket, HiOutlineShoppingCart } from 'react-icons/hi';
import { FaChevronRight } from 'react-icons/fa';

const cx = classNames.bind(Style);
function Cart() {
    const [carts, setCarts] = useState([]);
    const [qtyChange, setQtyChange] = useState(true);
    console.log('render');
    const listCartProduct = JSON.parse(localStorage.getItem('cart'));
    let products = useSelector((state) => state.headerState.cartProducts);
    const cartQuantity = useSelector((state) => state.headerState.cartQuantity);
    console.log(products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const deleteProduct = (id) => {
        const _listCartProduct = listCartProduct.filter((idProduct) => {
            return idProduct !== id;
        });
        console.log(id, _listCartProduct);
        localStorage.setItem('cart', JSON.stringify(_listCartProduct));
        dispatch(cartChange());
    };

    const increaseQty = async (cart, id) => {};

    const decreaseQty = async (cart, id) => {};

    const handlePayment = (id) => {
        notify('success', 'Thanh toán thành công');
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    const TotalProduct = carts.reduce((total, cart) => {
        return total + cart.qty;
    }, 0);
    const TotalPrice = carts.reduce((total, cart) => {
        return total + cart.TotalPrice;
    }, 0);

    useEffect(() => {
        //Kiểm tra vì lần cuối localStorage mảng [] nên dispatch sai
        dispatch(getCartProduct(listCartProduct));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartQuantity]);
    return (
        <div className="container page-content">
            <section className={cx('section-content padding-y')}>
                <div className={cx('container cart')}>
                    <div className={cx('row')}>
                        <h4>Giỏ hàng ({products.length}) </h4>
                        <main className={cx('col-xl-9 col-md-12 col-sm-12 col-12')}>
                            {products.length > 0 ? (
                                <>
                                    {' '}
                                    {products.map((product, index) => {
                                        return (
                                            <CartItem
                                                data={product}
                                                key={index}
                                                deleteProduct={() => {
                                                    deleteProduct(product.id);
                                                }}
                                                increaseQty={() => {
                                                    increaseQty(product.id);
                                                }}
                                                decreaseQty={() => {
                                                    decreaseQty(product.id);
                                                }}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <div className={cx('empty-cart')}>
                                    <img src={empty} alt="empty" />
                                    <h5>Giỏ hàng đang trống</h5>
                                </div>
                            )}

                            <div className={cx('alert alert-success mt-3')}>
                                <span className={cx('icontext')}>
                                    <i className={cx('icon text-success fa fa-truck')}></i> Giao nhanh miễn phí trong
                                    vòng 2-4 ngày
                                </span>
                            </div>
                        </main>
                        <aside className={cx('col-xl-3 col-md-12 col-sm-12 col-12')}>
                            <div className={cx('card mb-3')}>
                                <div className={cx('body')}>
                                    <div className={cx('form-group')}>
                                        <label className="cart-label">
                                            <HiOutlineTicket size={22} />
                                            Mã giảm giá
                                        </label>
                                        <div className={cx('input-group mt-2 mb-2')} style={{ flexWrap: 'nowrap' }}>
                                            <MDBInput className={cx('form-control')} label="Voucher" />

                                            <MDBBtn
                                                className="cart-btn"
                                                onClick={() => {
                                                    notify('error', 'Mã không khả dụng !');
                                                }}
                                            >
                                                Áp dụng
                                            </MDBBtn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('card')}>
                                <div className={cx('body')}>
                                    <label className="cart-label">
                                        <HiOutlineShoppingCart size={22} />
                                        Tóm tắt đơn hàng
                                    </label>
                                    <div className={cx('dlist-align')}>
                                        <p>Tạm tính:</p>
                                        <div className={cx('text-right')}>
                                            <NumericFormat
                                                value={TotalPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VNĐ'}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('dlist-align')}>
                                        <p>Khuyến mãi:</p>
                                        <div className={cx('text-right')}>{TotalProduct}</div>
                                    </div>
                                    <div className={cx('dlist-align')}>
                                        <p>Tổng cộng:</p>
                                        <dd className={cx('text-right h6')}>
                                            <div>
                                                <NumericFormat
                                                    value={TotalPrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VNĐ'}
                                                />
                                            </div>
                                        </dd>
                                    </div>{' '}
                                    <hr></hr>
                                    <MDBBtn className={cx('w-100 cart-btn')} onClick={handlePayment}>
                                        <span style={{ marginRight: '12px' }}>Thanh toán</span>
                                        <FaChevronRight />
                                    </MDBBtn>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            <ToastContainer className={cx('custom-Toast')} />
        </div>
    );
}

export default Cart;
