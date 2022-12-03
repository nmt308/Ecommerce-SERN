import classNames from 'classnames/bind';
import Style from './Product.scss';
import Title from '../../../components/Title';
import React, { useEffect, useState } from 'react';
import Modal from '../../../components/Modal';
import { MDBBadge, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import notify from '../../../components/Toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, deleteProduct, searchProduct } from '../../../redux/actions/productAction';
import { ImSearch } from 'react-icons/im';
import { AiFillCloseCircle } from 'react-icons/ai';
const cx = classNames.bind(Style);

function Product() {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [productID, setProductID] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');
    let dataRender;

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const products = useSelector((state) => state.productState.products);

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
        const result = await dispatch(searchProduct(searchText));
        setSearchResult(result);
    };

    const handleValueSearch = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        }
        setSearchText(e.target.value);
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
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá sản phẩm</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Danh mục</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {dataRender.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={product.image.split(',')[0]}
                                                alt=""
                                                style={{ width: '45px', height: '45px' }}
                                                className="rounded-circle"
                                            />
                                            <div className="ms-3">
                                                <p className="fw-bold mb-1">{product.name}</p>
                                            </div>
                                        </div>
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
                                    <td>{product['Category.name']}</td>
                                    <td>
                                        <MDBBtn
                                            color="link"
                                            rounded
                                            size="sm"
                                            onClick={() => {
                                                toggleShow('Update');
                                                setProductID(product.id);
                                            }}
                                        >
                                            Edit
                                        </MDBBtn>
                                        <MDBBtn
                                            color="link"
                                            rounded
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(product.id);
                                            }}
                                        >
                                            Delete
                                        </MDBBtn>
                                    </td>
                                </tr>
                            );
                        })}
                    </MDBTableBody>
                </MDBTable>
            </div>
            <Modal
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
