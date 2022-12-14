//Local
import Title from '../../../components/Title';
import notify from '../../../components/Toast';

import { useNavigateSearch } from '../../../CustomHook';
import Style from './Order.module.scss';
import classNames from 'classnames/bind';
//React
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { MDBBadge, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
//Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, searchOrder, updateOrder } from '../../../redux/actions/orderAction';
//Icon
import { ImSearch } from 'react-icons/im';
import { AiFillCloseCircle, AiFillEye, AiFillDelete } from 'react-icons/ai';
//Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
} from 'mdb-react-ui-kit';
const cx = classNames.bind(Style);
function Order() {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [currentPage, setCurrentPage] = useState(''); // Reset paginate
    const [searchCount, setSearchCount] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [render, setRender] = useState(false);

    const [basicModal, setBasicModal] = useState(false);
    const [details, setDetails] = useState([]);
    const toggleShow = () => setBasicModal(!basicModal);
    const user = useSelector((state) => state.headerState.user);

    let dispatch = useDispatch();
    let navigate = useNavigateSearch();

    const id = searchParams.get('id');
    const page = searchParams.get('page');

    useEffect(() => {
        if (id) {
            const getSearchResult = async () => {
                const res = await dispatch(searchOrder(id, page));
                setSearchCount(res.availableOrder);
                setSearchResult(res.result);
                setCurrentPage(parseInt(page) - 1);
            };
            getSearchResult();
        } else {
            setSearchResult('');
            setSearchText('');
            dispatch(getOrders(page));
            setCurrentPage(parseInt(page) - 1 > 0 ? parseInt(page) - 1 : 0); //V?? l???n ?????u page = null, null - 1 = -1
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, page, render]);

    let dataRender = [];
    let pageSize = 4;

    const orders = useSelector((state) => state.orderState.orders);
    const totalCategoy = useSelector((state) => state.orderState.totalOrder);
    let pageCount;

    if (searchResult) {
        pageCount = Math.ceil(searchCount / pageSize);
    } else {
        pageCount = Math.ceil(totalCategoy / pageSize);
    }

    const handleStatus = (orderID, status) => {
        let statusText;
        switch (status) {
            case 0:
                statusText = '??ang x??? l??';
                break;
            case 1:
                statusText = '???? x??? l??';
                break;
            case 2:
                statusText = '??ang giao h??ng';
                break;
            default:
                break;
        }
        if (window.confirm(`C???p nh???t tr???ng th??i ????n h??ng ${orderID} th??nh ${statusText} ?`)) {
            const updateStatus = async () => {
                //dispatch b???t ?????ng b???
                await dispatch(updateOrder(orderID, status, page));
                notify('success', 'C???p nh???t ????n h??ng th??nh c??ng');
                setRender(!render);
            };
            updateStatus();
        }
    };

    const handleSearch = async () => {
        if (!searchText) {
            return;
        }
        navigate('/admin/order', { id: searchText, page: 1 });
    };

    const handleValueSearch = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        }
        setSearchText(value);
    };

    const handlePageClick = async (e) => {
        const currentPage = e.selected + 1; // +1 v?? e.selected l???y t??? 0
        if (searchResult) {
            navigate('/admin/order', { id: id, page: currentPage || 1 });
        } else {
            navigate('/admin/order', { page: currentPage });
        }
    };

    const handleSeeDetail = async (orderID) => {
        const getOrderDetail = await axios.get('http://localhost:8080/api/orderDetail/search', {
            params: {
                order_id: orderID,
            },
        });

        setDetails(getOrderDetail.data.result);
        toggleShow();
    };

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

    if (searchResult) {
        dataRender = searchResult;
    } else {
        dataRender = orders;
    }

    return (
        <div>
            <Title name="Danh s??ch ????n h??ng" />
            <div className="action">
                <MDBInput
                    placeholder="Nh???p m?? ????n h??ng ..."
                    label="T??m ki???m"
                    type="text"
                    value={searchText}
                    onChange={(e) => {
                        handleValueSearch(e);
                    }}
                >
                    {searchText && (
                        <AiFillCloseCircle
                            size={24}
                            style={{ marginRight: '8px', color: 'rgb(169 167 167)', cursor: 'pointer' }}
                            onClick={() => {
                                setSearchText('');
                            }}
                        />
                    )}
                    <MDBBtn onClick={handleSearch} style={{ padding: '10px 16px', display: 'flex' }}>
                        <ImSearch size={16} />
                    </MDBBtn>
                </MDBInput>
            </div>
            <div className="content">
                <MDBTable align="middle">
                    <MDBTableHead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">T??n kh??ch h??ng</th>
                            <th scope="col">Tr???ng th??i ????n h??ng</th>
                            <th scope="col">Ng??y ?????t h??ng</th>

                            <th scope="col">T???ng ti???n h??ng</th>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                H??nh ?????ng
                            </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {dataRender.length < 1 ? (
                            <tr className="text-center">
                                <td colSpan="7">
                                    <div style={{ padding: '12px 0' }}>Kh??ng t??m th???y d??? li???u t????ng ???ng</div>
                                </td>
                            </tr>
                        ) : (
                            dataRender.map((Order) => {
                                return (
                                    <tr key={Order.id}>
                                        <td>{Order.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <p className="fw-500 mb-1">{Order.User.name}</p>
                                            </div>
                                        </td>

                                        <td>
                                            <div className={cx('status-action')}>
                                                <div
                                                    onClick={() => {
                                                        handleStatus(Order.id, 0);
                                                    }}
                                                    className={cx('status-btn', {
                                                        active: Order.status === 0,
                                                    })}
                                                >
                                                    ??ang x??? l??
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        handleStatus(Order.id, 1);
                                                    }}
                                                    className={cx('status-btn', {
                                                        active: Order.status === 1,
                                                    })}
                                                >
                                                    ???? x??c nh???n
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        handleStatus(Order.id, 2);
                                                    }}
                                                    className={cx('status-btn', {
                                                        active: Order.status === 2,
                                                    })}
                                                >
                                                    ??ang giao
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatDate(Order.createdAt)}</td>

                                        <td>{formatCurrency(Order.total)}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center">
                                                <Tippy content="Chi ti???t ????n h??ng" placement="top">
                                                    <div>
                                                        <MDBBtn
                                                            color="link"
                                                            rounded
                                                            size="sm"
                                                            onClick={() => {
                                                                handleSeeDetail(Order.id);
                                                            }}
                                                        >
                                                            <AiFillEye size={20} color="rgb(110 108 108)" />
                                                        </MDBBtn>
                                                    </div>
                                                </Tippy>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </MDBTableBody>
                </MDBTable>
            </div>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Chi ti???t ????n h??ng #{details[0] && details[0].Order.id}</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody className={cx('body')}>
                            {details.map((detail) => (
                                <div style={{ cursor: 'pointer' }} className={cx('container')}>
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
                                    Ng??y ?????t h??ng: <span>{details[0] && formatDate(details[0].Order.createdAt)}</span>
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
            <ReactPaginate
                className="pagination justify-content-center"
                nextLabel="Sau >"
                forcePage={currentPage}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< Tr?????c"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

            <ToastContainer />
        </div>
    );
}

export default Order;
