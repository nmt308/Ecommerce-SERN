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
            setCurrentPage(parseInt(page) - 1 > 0 ? parseInt(page) - 1 : 0); //Vì lần đầu page = null, null - 1 = -1
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
                statusText = 'Đang xử lí';
                break;
            case 1:
                statusText = 'Đã xử lí';
                break;
            case 2:
                statusText = 'Đang giao hàng';
                break;
            default:
                break;
        }
        if (window.confirm(`Cập nhật trạng thái đơn hàng ${orderID} thành ${statusText} ?`)) {
            const updateStatus = async () => {
                //dispatch bất đồng bộ
                await dispatch(updateOrder(orderID, status, page));
                notify('success', 'Cập nhật đơn hàng thành công');
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
        const currentPage = e.selected + 1; // +1 vì e.selected lấy từ 0
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
            <Title name="Danh sách đơn hàng" />
            <div className="action">
                <MDBInput
                    placeholder="Nhập mã đơn hàng ..."
                    label="Tìm kiếm"
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
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Trạng thái đơn hàng</th>
                            <th scope="col">Ngày đặt hàng</th>

                            <th scope="col">Tổng tiền hàng</th>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                Hành động
                            </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {dataRender.length < 1 ? (
                            <tr className="text-center">
                                <td colSpan="7">
                                    <div style={{ padding: '12px 0' }}>Không tìm thấy dữ liệu tương ứng</div>
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
                                                    Đang xử lí
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        handleStatus(Order.id, 1);
                                                    }}
                                                    className={cx('status-btn', {
                                                        active: Order.status === 1,
                                                    })}
                                                >
                                                    Đã xác nhận
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        handleStatus(Order.id, 2);
                                                    }}
                                                    className={cx('status-btn', {
                                                        active: Order.status === 2,
                                                    })}
                                                >
                                                    Đang giao
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatDate(Order.createdAt)}</td>

                                        <td>{formatCurrency(Order.total)}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center">
                                                <Tippy content="Chi tiết đơn hàng" placement="top">
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
                            <MDBModalTitle>Chi tiết đơn hàng #{details[0] && details[0].Order.id}</MDBModalTitle>
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
                                                Số lượng: {detail.quantity} x {formatCurrency(detail.Product.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className={cx('info')}>
                                <div>
                                    Email đặt hàng:<span>{user.email}</span>
                                </div>
                                <div>
                                    Ngày đặt hàng: <span>{details[0] && formatDate(details[0].Order.createdAt)}</span>
                                </div>

                                <div>
                                    Phương thức vận chuyển:<span>Ship COD</span>
                                </div>
                                <div>
                                    Tổng tiền:<span>{details[0] && formatCurrency(details[0].Order.total)} </span>
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
                previousLabel="< Trước"
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
