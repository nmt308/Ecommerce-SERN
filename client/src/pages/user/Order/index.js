import classNames from 'classnames/bind';
import Style from './Order.module.scss';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { BiTimeFive } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs';
import { BsCheck2All } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigateSearch } from '../../../CustomHook';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

const cx = classNames.bind(Style);
const Order = () => {
    const [orders, setOrders] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const [details, setDetails] = useState([]);
    const navigateSearch = useNavigateSearch();
    const user = useSelector((state) => state.headerState.user);

    const formatDate = (date) => {
        var d = new Date(date),
            hour = d.getHours(),
            minute = d.getMinutes(),
            second = d.getSeconds(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            year = d.getFullYear();
        return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const toggleShow = () => setBasicModal(!basicModal);

    useEffect(() => {
        const getOrders = async () => {
            const getUserID = await axios.get('http://localhost:8080/api/user/detail', {
                params: {
                    email: user.email,
                },
            });
            const userID = getUserID.data.user.id;
            const getOrders = await axios.get('http://localhost:8080/api/order/search', {
                params: {
                    user_id: userID,
                },
            });

            setOrders(getOrders.data.result);
        };
        getOrders();
    }, []);

    const handleSeeDetail = async (orderID) => {
        const getOrderDetail = await axios.get('http://localhost:8080/api/orderDetail/search', {
            params: {
                order_id: orderID,
            },
        });

        setDetails(getOrderDetail.data.result);
        toggleShow();
    };

    return (
        <div className="container">
            <div className={cx('content')}>
                <h4>????n h??ng c???a t??i</h4>
                {orders.map((order) => {
                    return (
                        <div className={cx('item')} key={order.id}>
                            <div className={cx('header')}>
                                <div>
                                    <div className={cx('name')}>????n h??ng #{order.id}</div>
                                    <div className={cx('date')}>Ng??y ?????t: {formatDate(order.createdAt)}</div>
                                </div>
                                <div
                                    className={cx('status', {
                                        handling: order.status === 0,
                                        handled: order.status === 1,
                                        shipping: order.status === 2,
                                    })}
                                >
                                    <span>
                                        {order.status === 0 && (
                                            <>
                                                <BiTimeFive size={18} />
                                                ??ang x??? l??
                                            </>
                                        )}
                                        {order.status === 1 && (
                                            <>
                                                <BsCheck2All size={18} />
                                                ???? x??c nh???n
                                            </>
                                        )}
                                        {order.status === 2 && (
                                            <>
                                                <BsTruck size={18} />
                                                ??ang giao h??ng
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('container')}>
                                <div className={cx('image')}>
                                    <img src={order.order_display.Product.image} alt="productt" />
                                </div>
                                <div className={cx('product')}>
                                    <div>
                                        <p className={cx('product-name')}>{order.order_display.Product.name}</p>
                                        <p className={cx('product-quantity')}>
                                            S??? l?????ng: {order.order_display.quantity} x{' '}
                                            {formatCurrency(order.order_display.Product.price)}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            className={cx('detail')}
                                            onClick={() => {
                                                handleSeeDetail(order.id);
                                            }}
                                        >
                                            Xem chi ti???t <HiChevronDoubleRight />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('price')}>T???ng ti???n: {formatCurrency(order.total)}</div>
                        </div>
                    );
                })}
            </div>
            <>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Chi ti???t ????n h??ng #{details[0] && details[0].Order.id}</MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody className={cx('body')}>
                                {details.map((detail) => (
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        className={cx('container')}
                                        onClick={() => {
                                            navigateSearch('/detail', {
                                                name: detail.Product.name,
                                            });
                                        }}
                                    >
                                        <div className={cx('image')}>
                                            <img src={detail.Product.image} alt="productt" />
                                        </div>
                                        <div className={cx('product')}>
                                            <div>
                                                <p className={cx('product-name')}>{detail.Product.name}</p>
                                                <p className={cx('product-quantity')}>
                                                    S??? l?????ng: {detail.quantity} x {formatCurrency(detail.Product.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className={cx('info')}>
                                    <div>
                                        Email ?????t h??ng:<span>{user.email}</span>
                                    </div>
                                    <div>
                                        Ng??y ?????t h??ng:{' '}
                                        <span>{details[0] && formatDate(details[0].Order.createdAt)}</span>
                                    </div>

                                    <div>
                                        Ph????ng th???c v???n chuy???n:<span>Ship COD</span>
                                    </div>
                                    <div>
                                        T???ng ti???n:<span>{details[0] && formatCurrency(details[0].Order.total)} </span>
                                    </div>
                                </div>
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </>
        </div>
    );
};
export default Order;
