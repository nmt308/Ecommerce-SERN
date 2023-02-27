import { useEffect, useState } from 'react';
import ArticleItem from '../../../components/ArticleItem';
import SkeletonLoading from '../../../components/ProductItem/SkeletonLoading';
import request from '../../../utils/request';
import classNames from 'classnames/bind';
import Style from './AllArticles.module.scss';
import { useDebounce } from '../../../CustomHook';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
const cx = classNames.bind(Style);

export default function AllArticle() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState([]);
    const [value, setValue] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const debounce = useDebounce(value, 200);

    let dataRender;

    if (searchResult.length > 0) {
        dataRender = searchResult;
    } else {
        dataRender = news;
    }

    if (dataRender.length > 0 && !loading) {
        dataRender = dataRender.map((article) => {
            return (
                <div className="col-lg-4 col-md-6 mt-4">
                    <ArticleItem data={article} />
                </div>
            );
        });
    }

    if (dataRender.length === 0) {
        if (loading) {
            dataRender = Array.from(Array(6)).map((item) => (
                <div className="col-lg-4 col-md-6 mt-4">
                    <SkeletonLoading />
                </div>
            ));
        } else {
            dataRender = <div className="w-100 mt-5 text-center">No article was found. Please try again</div>;
        }
    }

    const handleValue = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        }
        setValue(value);
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            setSearchLoading(false);
            return;
        }
        setSearchLoading(true);
        const searchProducts = async () => {
            const res = await request.get('/article/search', {
                params: {
                    limit: 10,
                    title: debounce,
                },
            });

            setSearchLoading(false);
            setSearchResult(res.data.result);
            console.log(res.data.result);
        };
        searchProducts();
        return () => {
            setSearchLoading(true);
            setSearchResult([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        request
            .get('/articles', {
                params: {
                    limit: 6,
                },
            })
            .then((res) => {
                setNews(res.data.articles);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container" style={{ marginBottom: '28px' }}>
            <div className={cx('search')}>
                <ImSearch style={{ marginLeft: '18px', marginRight: '12px' }} />
                <input placeholder="Nhập tên bài viết ..." value={value} onChange={handleValue} />
                {searchLoading && <AiOutlineLoading3Quarters className="loading" style={{ marginRight: '16px' }} />}
            </div>
            <div className="row">{dataRender}</div>
        </div>
    );
}
