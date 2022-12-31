//React
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useNaviagteSearch from '../../../CustomHook/useNavigateSearch';
import NotFound from '../../../assets/icon/notfound.png';
//Local
import ProductItem from '../../../components/ProductItem';
import classNames from 'classnames/bind';
import Style from './Search.module.scss';
//Icon
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { AiOutlinePercentage, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { HiChevronDoubleDown } from 'react-icons/hi';

import { FiTruck } from 'react-icons/fi';
import { MDBBtn } from 'mdb-react-ui-kit';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/actions/searchAction';

const cx = classNames.bind(Style);
let params = {};

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [availableProduct, setAvailableProduct] = useState(0);

    const dispatch = useDispatch();
    const navigateSearch = useNaviagteSearch();
    const dataRender = useSelector((state) => state.searchState.products);

    const brand = searchParams.get('brand');
    const sort = searchParams.get('sort');
    const type = searchParams.get('type');

    params = { brand, sort, type };

    //Xóa để lúc back về object còn đúng các param trên url
    if (!sort) {
        delete params.sort;
    }
    if (!type) {
        delete params.type;
    }
    const handleSort = (sort) => {
        setOffset(0);
        params.sort = sort;
        navigateSearch('/search', params);
    };
    const handleType = (type) => {
        setOffset(0);
        params.type = type;
        navigateSearch('/search', params);
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
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await dispatch(getProducts(params, offset));
            setAvailableProduct(res.data.availableProduct);
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brand, sort, type, offset]);

    return (
        <div className="container d-flex flex-column" style={{ marginBottom: '32px' }}>
            <div className={cx('filter-title')}>Sắp xếp theo</div>
            <div className={cx('filter-action')}>
                <button
                    className={cx({ active: sort === 'desc' })}
                    onClick={() => {
                        handleSort('desc');
                    }}
                >
                    <BiSortDown />
                    Giá giảm dần
                </button>
                <button
                    className={cx({ active: sort === 'asc' })}
                    onClick={() => {
                        handleSort('asc');
                    }}
                >
                    <BiSortUp />
                    Giá tăng dần
                </button>
                <button
                    className={cx({ active: sort === 'buyturn' })}
                    onClick={() => {
                        handleSort('buyturn');
                    }}
                >
                    <AiOutlinePercentage />
                    Bán chạy
                </button>
                <button
                    className={cx({ active: sort === 'new' })}
                    onClick={() => {
                        handleSort('new');
                    }}
                >
                    <FiTruck />
                    Mới về
                </button>
            </div>
            <div className={cx('filter-title')}>Loại sản phẩm</div>
            <div className={cx('filter-action')}>
                <button
                    className={cx({ active: type === 'phone' })}
                    onClick={() => {
                        handleType('phone');
                    }}
                >
                    <BiSortDown />
                    Điện thoại
                </button>
                <button
                    className={cx({ active: type === 'laptop' })}
                    onClick={() => {
                        handleType('laptop');
                    }}
                >
                    <BiSortUp />
                    Laptop
                </button>
                <button
                    className={cx({ active: type === 'tablet' })}
                    onClick={() => {
                        handleType('tablet');
                    }}
                >
                    <AiOutlinePercentage />
                    Máy tính bảng
                </button>
                <button
                    className={cx({ active: type === 'other' })}
                    onClick={() => {
                        handleType('other');
                    }}
                >
                    <FiTruck />
                    Khác
                </button>
            </div>
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
