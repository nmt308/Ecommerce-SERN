//Local
import Title from '../../../components/Title';
import notify from '../../../components/Toast';
import Style from './Account.module.scss';
//React
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
} from 'mdb-react-ui-kit';
import { useNavigateSearch } from '../../../CustomHook';
//Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, searchAccount, updateAccount } from '../../../redux/actions/accountAction';
//Icon
import { ImSearch } from 'react-icons/im';
import { AiFillCloseCircle, AiFillEye } from 'react-icons/ai';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { BiTimeFive } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs';
import { BsCheck2All } from 'react-icons/bs';
//Other
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import request from '../../../utils/request';
import classNames from 'classnames/bind';

const cx = classNames.bind(Style);
function Account() {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [currentPage, setCurrentPage] = useState(''); // Reset paginate
    const [searchCount, setSearchCount] = useState('');
    const [render, setRender] = useState(false);
    const [basicModal, setBasicModal] = useState(false);
    const [details, setDetails] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const toggleShow = () => setBasicModal(!basicModal);

    let dispatch = useDispatch();
    let navigate = useNavigateSearch();

    const email = searchParams.get('email');
    const page = searchParams.get('page');

    useEffect(() => {
        if (email) {
            const getSearchResult = async () => {
                const res = await dispatch(searchAccount(email, page));
                setSearchCount(res.availableAccount);
                setSearchResult(res.result);
                setCurrentPage(parseInt(page) - 1);
            };
            getSearchResult();
        } else {
            setSearchResult('');
            setSearchText('');
            dispatch(getAccounts(page));
            setCurrentPage(parseInt(page) - 1 > 0 ? parseInt(page) - 1 : 0); //Vì lần đầu page = null, null - 1 = -1
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, page, render]);

    let dataRender = [];
    let pageSize = 4;

    const accounts = useSelector((state) => state.accountState.accounts);
    const totalCategoy = useSelector((state) => state.accountState.totalAccount);
    let pageCount;

    if (searchResult) {
        pageCount = Math.ceil(searchCount / pageSize);
    } else {
        pageCount = Math.ceil(totalCategoy / pageSize);
    }

    const handleRole = (accountID, role) => {
        let roleText;

        switch (role) {
            case 0:
                roleText = 'Người dùng';
                break;
            case 1:
                roleText = 'Quản trị viên';
                break;

            default:
                break;
        }
        if (window.confirm(`Cập nhật phân quyền tài khoản #${accountID} thành ${roleText} ?`)) {
            const updateRole = async () => {
                //dispatch bất đồng bộ
                await dispatch(updateAccount(accountID, role, page));
                notify('success', 'Cập nhật phân quyền thành công');
                setRender(!render);
            };
            updateRole();
        }
    };

    const handleSearch = async () => {
        if (!searchText) {
            return;
        }
        navigate('/admin/account', { email: searchText, page: 1 });
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
            navigate('/admin/account', { email: email, page: currentPage || 1 });
        } else {
            navigate('/admin/account', { page: currentPage });
        }
    };

    const handleSeeDetail = async (accountID) => {
        const getAccountDetail = await request.get('/order/search', {
            params: {
                user_id: accountID,
            },
        });
        setDetails(getAccountDetail.data.result);
        toggleShow();
    };

    const handleDetailOrder = (id) => {
        navigate('/admin/order', { id: id, page: 1 });
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
        dataRender = accounts;
    }

    return (
        <div>
            <Title name="Danh sách tài khoản" />
            <div className="action">
                <MDBInput
                    placeholder="Nhập tên email ..."
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
                            <th scope="col">Email</th>
                            <th scope="col">Phân quyền</th>
                            <th scope="col">Ngày tạo tài khoản</th>
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
                            dataRender.map((Account) => {
                                return (
                                    <tr key={Account.id}>
                                        <td>{Account.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <p className="fw-500 mb-1">{Account.name}</p>
                                            </div>
                                        </td>
                                        <td>{Account.email}</td>
                                        <td>
                                            <div className={cx('role-action')}>
                                                <div
                                                    onClick={() => {
                                                        if (Account.role === 1) {
                                                            alert('Bạn không thể thay đổi cho quản trị viên !');
                                                            return;
                                                        }
                                                    }}
                                                    className={cx('role-btn', {
                                                        active: Account.role === 0,
                                                    })}
                                                >
                                                    Người dùng
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        if (Account.role === 1) {
                                                            return;
                                                        }
                                                        handleRole(Account.id, 1);
                                                    }}
                                                    className={cx('role-btn', {
                                                        active: Account.role === 1,
                                                    })}
                                                >
                                                    Quản trị viên
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatDate(Account.createdAt)}</td>

                                        <td style={{ textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center">
                                                <Tippy content="Lịch sử đặt hàng" placement="top">
                                                    <div>
                                                        <MDBBtn
                                                            color="link"
                                                            rounded
                                                            size="sm"
                                                            onClick={() => {
                                                                handleSeeDetail(Account.id);
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
                            <MDBModalTitle>Lịch sử đặt hàng </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody className={cx('body')}>
                            {details.length > 0 ? (
                                details.map((detail) => (
                                    <div className={cx('item')} key={detail.id}>
                                        <div className={cx('header')}>
                                            <div>
                                                <div className={cx('name')}>Đơn hàng #{detail.id}</div>
                                                <div className={cx('date')}>
                                                    Ngày đặt: {formatDate(detail.createdAt)}
                                                </div>
                                            </div>
                                            <div
                                                className={cx('status', {
                                                    handling: detail.status === 0,
                                                    handled: detail.status === 1,
                                                    shipping: detail.status === 2,
                                                })}
                                            >
                                                <span>
                                                    {detail.status === 0 && (
                                                        <>
                                                            <BiTimeFive size={18} />
                                                            Đang xử lí
                                                        </>
                                                    )}
                                                    {detail.status === 1 && (
                                                        <>
                                                            <BsCheck2All size={18} />
                                                            Đã xác nhận
                                                        </>
                                                    )}
                                                    {detail.status === 2 && (
                                                        <>
                                                            <BsTruck size={18} />
                                                            Đang giao hàng
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('container')}>
                                            <div className={cx('image')}>
                                                <img src={detail.order_display.Product.image} alt="productt" />
                                            </div>
                                            <div className={cx('product')}>
                                                <div>
                                                    <p className={cx('product-name')}>
                                                        {detail.order_display.Product.name}
                                                    </p>
                                                    <p className={cx('product-quantity')}>
                                                        Số lượng: {detail.order_display.quantity} x{' '}
                                                        {formatCurrency(detail.order_display.Product.price)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p
                                                        className={cx('detail')}
                                                        onClick={() => {
                                                            handleDetailOrder(detail.id);
                                                        }}
                                                    >
                                                        Xem chi tiết <HiChevronDoubleRight />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('price')}>Tổng tiền: {formatCurrency(detail.total)}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center mt-3">Người dùng này chưa có đơn hàng</p>
                            )}
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

export default Account;
