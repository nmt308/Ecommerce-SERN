//Local
import Style from './Search.module.scss';
import SearchItem from '../SearchItem';
import { useDebounce } from '../../CustomHook';
//React
import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//Firebase
import { collection, getDocs } from 'firebase/firestore';
//Other
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { ImSearch } from 'react-icons/im';
const cx = classNames.bind(Style);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [value, setValue] = useState('');
    const [hideToolTip, setToolTip] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const debounce = useDebounce(value, 500);
    const navigate = useNavigate();

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
            localStorage.setItem('search', value);
            window.location.href = '/search';
        }
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            setLoading(false);
            return;
        }

        return () => {
            setLoading(true);
            setSearchResult([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    return (
        <HeadlessTippy
            interactive
            visible={(hideToolTip && searchResult.length > 0) || (loading && searchResult.length === 0)}
            render={(attrs) => (
                <div className={cx('result')} tabIndex="-1" {...attrs}>
                    <div className={cx('wrapper')}>
                        <span className={cx('title')}>Sản phẩm</span>
                        {searchResult.map((item, index) => {
                            return (
                                <SearchItem
                                    data={item}
                                    key={index}
                                    onClick={() => {
                                        localStorage.setItem('productDetail', JSON.stringify(item));
                                        setValue('');
                                        setSearchResult([]);
                                    }}
                                />
                            );
                        })}
                        {loading && searchResult.length === 0 && (
                            <div className={cx('loading')}>
                                <div className={cx('loading-avt')}></div>
                                <div className={cx('loading-info')}>
                                    <div className={cx('loading-name')}></div>
                                    <div className={cx('loading-price')}></div>
                                </div>
                            </div>
                        )}
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
