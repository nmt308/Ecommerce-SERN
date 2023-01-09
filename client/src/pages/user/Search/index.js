//React
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useNaviagteSearch from '../../../CustomHook/useNavigateSearch';
import NotFound from '../../../assets/icon/notfound.png';
//Local
import ProductItem from '../../../components/ProductItem';
import classNames from 'classnames/bind';
import Style from './Search.module.scss';
//Icon
import { BiSortDown, BiSortUp, BiFilterAlt } from 'react-icons/bi';
import { AiOutlinePercentage, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { HiChevronDoubleDown } from 'react-icons/hi';
import { MdAttachMoney } from 'react-icons/md';

import { FiTruck } from 'react-icons/fi';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/actions/searchAction';
import axios from 'axios';

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

const cx = classNames.bind(Style);
let params = {};

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [availableProduct, setAvailableProduct] = useState(0);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const { page } = useParams();

    const dispatch = useDispatch();
    const navigateSearch = useNaviagteSearch();
    const dataRender = useSelector((state) => state.searchState.products);

    const brand = searchParams.get('brand');
    const sort = searchParams.get('sort');
    const type = searchParams.get('type');
    const name = searchParams.get('name');
    const price = searchParams.get('price');

    params = { brand, sort, type, name, price };

    //Xóa để lúc back về object còn đúng các param trên url
    if (!sort) {
        delete params.sort;
    }
    if (!type) {
        delete params.type;
    }
    if (!brand) {
        delete params.brand;
    }
    if (!price) {
        delete params.price;
    }
    if (!name) {
        delete params.name;
    }
    let totalFilter = 0;
    for (const entry of searchParams.entries()) {
        totalFilter++;
    }

    //Cần reset offset mỗi khi click filter và back để lấy 10 item đầu
    const handleFilter = (filterType, option) => {
        setOffset(0);
        switch (filterType) {
            case 'sort':
                params.sort = option;
                break;
            case 'type':
                params.type = option;
                break;
            case 'brand':
                params.brand = option;
                break;
            case 'name':
                params.name = option;
                break;
            case 'price':
                params.price = option;
                break;
            default:
                break;
        }
        navigateSearch(`/search/${page}`, params);
    };

    const showMore = () => {
        setLoading(true);
        setTimeout(() => {
            setOffset(offset + 10);
            setLoading(false);
        }, 1500);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        window.onpopstate = async () => {
            const res = await dispatch(getProducts(params, 0));
            setAvailableProduct(res.data.availableProduct);
            setOffset(0);
            setBasicModal(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await dispatch(getProducts(params));
            setAvailableProduct(res.data.availableProduct);
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brand, sort, type, price]);

    useEffect(() => {
        const loadMore = async () => {
            const res = await dispatch(getProducts(params, offset));
            setAvailableProduct(res.data.availableProduct);
        };
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    useEffect(() => {
        if (page === 'brand' || page === 'product') {
            const getCategories = async () => {
                const res = await axios.get('http://localhost:8080/api/categories', {
                    params: {
                        getAll: true,
                    },
                });
                setCategories(res.data.categories);
            };
            getCategories();
        }
        if (page === 'category' || page === 'product') {
            const getBrands = async () => {
                const res = await axios.get('http://localhost:8080/api/brands', {
                    params: {
                        getAll: true,
                    },
                });
                setBrands(res.data.brands);
            };
            getBrands();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <button className={cx('show-filter')} onClick={toggleShow}>
                <BiFilterAlt />
                Bộ lọc <span className={cx('quantity')}>{totalFilter - 1}</span>
            </button>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalBody>
                            <div className={cx('filter')}>
                                <div className={cx('title')}>Sắp xếp theo</div>
                                <div className={cx('action')}>
                                    <button
                                        className={cx({ active: sort === 'desc' })}
                                        onClick={() => {
                                            handleFilter('sort', 'desc');
                                        }}
                                    >
                                        <BiSortDown />
                                        Giá giảm dần
                                    </button>
                                    <button
                                        className={cx({ active: sort === 'asc' })}
                                        onClick={() => {
                                            handleFilter('sort', 'asc');
                                        }}
                                    >
                                        <BiSortUp />
                                        Giá tăng dần
                                    </button>
                                    <button
                                        className={cx({ active: sort === 'buyturn' })}
                                        onClick={() => {
                                            handleFilter('sort', 'buyturn');
                                        }}
                                    >
                                        <AiOutlinePercentage />
                                        Bán chạy
                                    </button>
                                    <button
                                        className={cx({ active: sort === 'new' })}
                                        onClick={() => {
                                            handleFilter('sort', 'new');
                                        }}
                                    >
                                        <FiTruck />
                                        Mới về
                                    </button>
                                </div>
                            </div>
                            <div className={cx('filter')}>
                                <div className={cx('title')}>Khoảng giá</div>
                                <div className={cx('action')}>
                                    <button
                                        className={cx({ active: price === '0_5m' })}
                                        onClick={() => {
                                            handleFilter('price', '0_5m');
                                        }}
                                    >
                                        <MdAttachMoney />
                                        0-5 triệu
                                    </button>
                                    <button
                                        className={cx({ active: price === '5m_10m' })}
                                        onClick={() => {
                                            handleFilter('price', '5m_10m');
                                        }}
                                    >
                                        <MdAttachMoney />
                                        5-10 triệu
                                    </button>
                                    <button
                                        className={cx({ active: price === '10m_20m' })}
                                        onClick={() => {
                                            handleFilter('price', '10m_20m');
                                        }}
                                    >
                                        <MdAttachMoney />
                                        10-20 triệu
                                    </button>
                                    <button
                                        className={cx({ active: price === '20m_over' })}
                                        onClick={() => {
                                            handleFilter('price', '20m_over');
                                        }}
                                    >
                                        <MdAttachMoney />
                                        Trên 20 triệu
                                    </button>
                                </div>
                            </div>
                            {(page === 'brand' || page === 'product') && (
                                <div className={cx('filter')}>
                                    <div className={cx('title')}>Loại sản phẩm</div>
                                    <div className={cx('action')}>
                                        {categories.map((category) => {
                                            return (
                                                <button
                                                    className={cx({ active: type === category.name })}
                                                    onClick={() => {
                                                        handleFilter('type', category.name);
                                                    }}
                                                >
                                                    {category.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {(page === 'category' || page === 'product') && (
                                <div className={cx('filter')}>
                                    <div className={cx('title')}>Thương hiệu</div>
                                    <div className={cx('action')}>
                                        {brands.map((item) => (
                                            <button
                                                className={cx({ active: brand === item.name })}
                                                onClick={() => {
                                                    handleFilter('brand', item.name);
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <MDBBtn rounded className={cx('btn')} style={{ marginTop: '8px' }} onClick={toggleShow}>
                                Xem sản phẩm
                            </MDBBtn>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            {dataRender.length === 0 ? (
                <div className="text-center">
                    <img src={NotFound} alt="404" />
                    <p style={{ fontSize: '20px', fontWeight: '500' }}>Không tìm thấy dữ liệu tương ứng</p>
                </div>
            ) : (
                <div className="row row-cols-5">
                    {dataRender.map((product) => (
                        <div key={product.id} className="col" style={{ paddingRight: 0, marginTop: '12px' }}>
                            <ProductItem data={product} width="100%" />
                        </div>
                    ))}
                </div>
            )}

            {dataRender.length !== availableProduct && (
                <MDBBtn rounded className={cx('btn')} onClick={showMore} disabled={loading}>
                    {loading ? (
                        <span className="text">
                            Đang tải
                            <AiOutlineLoading3Quarters className="loading" />
                        </span>
                    ) : (
                        <span className="text">
                            Xem thêm
                            <HiChevronDoubleDown />
                        </span>
                    )}
                </MDBBtn>
            )}
        </div>
    );
}
