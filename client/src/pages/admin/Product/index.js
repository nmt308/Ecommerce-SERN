//Local
import './Product.scss';
import Title from '../../../components/Title';
import ModalProduct from '../../../components/Modal/ModalProduct';
import notify from '../../../components/Toast';
import { useNavigateSearch } from '../../../CustomHook';
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
import { getProducts, deleteProduct, searchProduct } from '../../../redux/actions/productAction';
//Icon
import { ImSearch } from 'react-icons/im';
import { AiFillCloseCircle, AiFillEye, AiFillDelete } from 'react-icons/ai';
//Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Product() {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [productID, setProductID] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [searchCount, setSearchCount] = useState('');
    const [currentPage, setCurrentPage] = useState(''); // Reset paginate
    const [searchParams, setSearchParams] = useSearchParams();

    let dispatch = useDispatch();
    let navigate = useNavigateSearch();

    let dataRender;
    let pageSize = 4;

    const name = searchParams.get('name');
    const page = searchParams.get('page');

    useEffect(() => {
        if (name) {
            const getSearchResult = async () => {
                const res = await dispatch(searchProduct(name, page));
                setSearchCount(res.availableProduct);
                setSearchResult(res.result);
                setCurrentPage(parseInt(page) - 1);
            };
            getSearchResult();
        } else {
            setSearchResult('');
            setSearchText('');
            dispatch(getProducts(page));
            setCurrentPage(parseInt(page) - 1 > 0 ? parseInt(page) - 1 : 0); //Vì lần đầu page = null, null - 1 = -1
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, page, dispatch]);

    const products = useSelector((state) => state.productState.products);
    const totalProduct = useSelector((state) => state.productState.totalProduct);
    let pageCount;

    if (searchResult) {
        pageCount = Math.ceil(searchCount / pageSize);
    } else {
        pageCount = Math.ceil(totalProduct / pageSize);
    }

    const toggleShow = (typeModal) => {
        switch (typeModal) {
            case 'Add':
                setModalAdd(!modalAdd);
                break;
            case 'Update':
                setModalUpdate(!modalUpdate);
                break;
            default:
                return;
        }
    };

    const handleDelete = (id) => {
        setTimeout(async () => {
            if (window.confirm('Bạn có muốn xóa sản phẩm này ?')) {
                const res = await dispatch(deleteProduct(id, page));
                notify(res.type, res.message);
            }
        }, 500);
    };

    const handleSearch = async () => {
        if (!searchText) {
            return;
        }
        navigate('/admin/product', { name: searchText, page: 1 });
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
            navigate('/admin/product', { name: name, page: currentPage || 1 });
        } else {
            navigate('/admin/product', { page: currentPage });
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    if (searchResult.length > 0) {
        dataRender = searchResult;
    } else {
        dataRender = products;
    }

    return (
        <div>
            <Title name="Danh sách sản phẩm" />
            <div className="action">
                <MDBInput
                    placeholder="Nhập tên sản phẩm ..."
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

                <MDBBtn
                    rounded
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        toggleShow('Add');
                    }}
                >
                    Thêm sản phẩm
                </MDBBtn>
            </div>
            <div className="content">
                <MDBTable align="middle">
                    <MDBTableHead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Giá sản phẩm</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Danh mục</th>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                Hành động
                            </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {dataRender.length < 1 ? (
                            <tr className="text-center">
                                <td colSpan="8">
                                    <div style={{ padding: '12px 0' }}>Không tìm thấy dữ liệu tương ứng</div>
                                </td>
                            </tr>
                        ) : (
                            dataRender.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td style={{ maxWidth: ' 285px' }}>
                                            <div className="d-flex align-items-center">
                                                <p className="fw-500 mb-1 table-name">{product.name}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <img
                                                src={product.image.split(',')[0]}
                                                alt=""
                                                style={{ width: '45px', height: '45px' }}
                                            />
                                        </td>
                                        <td style={{ fontSize: '14px' }}>
                                            <p className="fw-500 mb-1">{formatCurrency(product.price)}</p>
                                            <p className="text-muted mb-0">
                                                <del>{formatCurrency(product.oldprice)}</del>
                                            </p>
                                        </td>
                                        <td>
                                            <MDBBadge color="success" pill>
                                                Active
                                            </MDBBadge>
                                        </td>
                                        <td>{product.quantity}</td>
                                        <td>{product.Category.name}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div className="d-flex justify-content-center">
                                                <Tippy content="Chi tiết" placement="top">
                                                    <div>
                                                        <MDBBtn
                                                            color="link"
                                                            rounded
                                                            size="sm"
                                                            onClick={() => {
                                                                toggleShow('Update');
                                                                setProductID(product.id);
                                                            }}
                                                        >
                                                            <AiFillEye size={20} color="rgb(110 108 108)" />
                                                        </MDBBtn>
                                                    </div>
                                                </Tippy>
                                                <Tippy content="Xóa" placement="top">
                                                    <div>
                                                        <MDBBtn
                                                            color="link"
                                                            rounded
                                                            size="sm"
                                                            onClick={() => {
                                                                handleDelete(product.id);
                                                            }}
                                                        >
                                                            <AiFillDelete size={20} color="rgb(110 108 108)" />
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
            <ModalProduct
                idProduct={productID}
                modalType={modalUpdate ? 'Update' : 'Add'}
                modalAdd={modalAdd}
                setModalAdd={setModalAdd}
                modalUpdate={modalUpdate}
                setModalUpdate={setModalUpdate}
                toggleShow={toggleShow}
            />
            <ToastContainer />
        </div>
    );
}

export default Product;
