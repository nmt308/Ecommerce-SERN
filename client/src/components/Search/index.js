//Local
import Style from './Search.module.scss';
import SearchItem from '../SearchItem';
//React
import { useDebounce, useNavigateSearch } from '../../CustomHook';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { HiChevronDoubleRight } from 'react-icons/hi';
//Other
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(Style);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [count, setCount] = useState(0);
    const [value, setValue] = useState('');
    const [hideToolTip, setToolTip] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigateSearch = useNavigateSearch();
    const inputRef = useRef();
    const debounce = useDebounce(value, 200);

    const handleTooltip = () => {
        setToolTip(false);
    };

    const handleValue = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        }
        setValue(value);
    };

    const handleSearch = () => {
        if (!value) {
            return;
        } else {
            setValue('');
            setTimeout(() => {
                navigateSearch('/search/product', {
                    name: debounce,
                });
            }, 500);
        }
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        const searchProducts = async () => {
            const res = await axios.get('http://localhost:8080/api/product/search', {
                params: {
                    name: debounce,
                },
            });
            setTimeout(() => {
                setLoading(false);
                setSearchResult(res.data.result);
                setCount(res.data.availableProduct);
            }, 500);
        };
        searchProducts();
        return () => {
            setLoading(true);
            setSearchResult([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    return (
        <HeadlessTippy
            interactive
            visible={hideToolTip && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('result')} tabIndex="-1" {...attrs}>
                    <div className={cx('wrapper')}>
                        <span className={cx('title')}>Sản phẩm ({count})</span>
                        {searchResult.map((item, index) => {
                            return (
                                <SearchItem
                                    data={item}
                                    key={index}
                                    onClick={() => {
                                        setValue('');
                                        setSearchResult([]);
                                        navigateSearch('/detail', { name: item.name });
                                    }}
                                />
                            );
                        })}
                        <div className={cx('more')} onClick={handleSearch}>
                            Xem tất cả <HiChevronDoubleRight />
                        </div>
                    </div>
                </div>
            )}
            onClickOutside={handleTooltip}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Tìm kiếm ..."
                    value={value}
                    onChange={handleValue}
                    onFocus={() => {
                        setToolTip(true);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                        }
                    }}
                />
                {loading && <AiOutlineLoading3Quarters className="loading" />}
                <div
                    className={cx('searchBtn')}
                    onClick={(e) => {
                        handleSearch(e);
                    }}
                >
                    <ImSearch />
                </div>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
