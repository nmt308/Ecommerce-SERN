import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { FaSearch } from 'react-icons/fa';
import classNames from 'classnames/bind';
import Style from './SearchArticle.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../CustomHook';
import request from '../../utils/request';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
const cx = classNames.bind(Style);
export default function SeaerchArticle() {
    const [searchResult, setSearchResult] = useState([]);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const debounce = useDebounce(value, 200);

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
            const res = await request.get('/articles', {
                params: {
                    limit: 10,
                    title: debounce,
                },
            });
            setTimeout(() => {
                setLoading(false);
                setSearchResult(res.data.result);
                console.log('search', res);
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
        <div className={cx('search')}>
            <ImSearch style={{ marginLeft: '18px', marginRight: '12px' }} />
            <input
                placeholder="Nhập tên bài viết ..."
                value={value}
                onChange={handleValue}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(e);
                    }
                }}
            />
            {loading && <AiOutlineLoading3Quarters className="loading" style={{ marginRight: '16px' }} />}
        </div>
    );
}
