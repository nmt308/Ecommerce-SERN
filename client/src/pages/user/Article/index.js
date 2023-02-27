import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../../../utils/request';
import parse from 'html-react-parser';
import Style from './Article.module.scss';
import { NumericFormat } from 'react-number-format';
import { MDBBtn } from 'mdb-react-ui-kit';
import Loading from '../../../components/Loading';
export default function News() {
    const [detail, setDetail] = useState({});
    const [listProduct, setListProduct] = useState([]);
    const [preload, setPreload] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        request.get(`/article/detail/${id}`).then((res) => {
            setDetail(res.data.article);
            setListProduct(res.data.article.listProducts);
            setPreload(false);
        });
    }, []);

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
    return preload ? (
        <Loading />
    ) : (
        <section className="container py-5 mx-auto article-container">
            <div className="mt-5 py-md-4">
                <div className="container">
                    <div className="blog-title">
                        <h2 className="title-big">{detail?.title}</h2>
                        <div className={Style.box}>
                            <p>
                                Ngày đăng <strong>{formatDate(detail?.createdAt)}</strong>{' '}
                            </p>
                            <p style={{ marginLeft: '24px' }}>
                                <strong>1 phút đọc</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="image mb-sm-5 mb-4 text-center">
                    <img src={detail?.image} alt="" className="img-fluid radius-image-full" />
                </div>
                <div className="container">
                    <div className="row">
                        <div>
                            <p className="mb-3">{parse(detail.content ?? '')}</p>
                        </div>
                    </div>{' '}
                    <div style={{ fontWeight: '600' }}>Sản phẩm trong bài:</div>
                    {listProduct.length > 0 &&
                        listProduct.map((product) => {
                            return (
                                <div className={Style.wrapper}>
                                    <div className={Style.avatar}>
                                        <img src={product.Product.image} alt={product.Product.name} />
                                    </div>
                                    <div className={Style.info}>
                                        <div className={Style.name}>{product.Product.name}</div>
                                        <span className={Style.price}>
                                            <NumericFormat
                                                value={product.Product.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VNĐ'}
                                            />
                                        </span>
                                    </div>
                                    <MDBBtn
                                        rounded
                                        onClick={() => {
                                            navigate(`/detail?name=${product.Product.name}`);
                                        }}
                                    >
                                        Xem chi tiết
                                    </MDBBtn>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
