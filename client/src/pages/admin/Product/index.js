//Local
import './Product.scss';
import Title from '../../../components/Title';
import ModalProduct from '../../../components/Modal/ModalProduct';
import notify from '../../../components/Toast';
import { MDBBadge, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
//React
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
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
    const [countAllProduct, setCountAllProduct] = useState(1); //Tổng số sản phẩm có trong database
    const [currentPage, setCurrentPage] = useState(''); // Reset paginate

    let dataRender;
    let pageSize = 4;
    let dispatch = useDispatch();

    useEffect(() => {
        const getProductsAndCountAll = async () => {
            const countProduct = await dispatch(getProducts());
            setCountAllProduct(countProduct);
        };
        getProductsAndCountAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const products = useSelector((state) => state.productState.products);

    const pageCount = Math.ceil(countAllProduct / pageSize);

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
                const res = await dispatch(deleteProduct(id));
                console.log('notify');
                notify(res.type, res.message);
            }
        }, 500);
    };

    const handleSearch = async () => {
        if (!searchText) {
            return;
        }
        const res = await dispatch(searchProduct(searchText, 1));
        setCountAllProduct(res.availableProduct);
        setSearchResult(res.result);
        setCurrentPage(0);
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
            const res = await dispatch(searchProduct(searchText, currentPage));
            setSearchResult(res.result);
        } else {
            dispatch(getProducts(currentPage));
        }
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
                            <th scope="col">Ảnh sản phẩm</th>
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
                        {dataRender.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <p className="fw-bold mb-1">{product.name}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <img
                                            src={product.image.split(',')[0]}
                                            alt=""
                                            style={{ width: '45px', height: '45px' }}
                                            className="rounded-circle"
                                        />
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">{product.price}</p>
                                        <p className="text-muted mb-0">{product.oldprice}</p>
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
                        })}
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
