import Style from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import FreeShipIcon from '../../assets/icon/freeship';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(Style);
export default function ProductItem({ data, width }) {
    const discount = 100 - Math.ceil((data.price / data.oldprice) * 100);
    const [loading, setLoading] = useState(true);
    return (
        <div className={cx('product-item')} style={{ width: width }}>
            <Link to={`/detail?name=${encodeURIComponent(data.name)}`}>
                {loading && <div className={cx('default')} style={{ width: '100%', height: '175px' }}></div>}
                <div className={cx('product-img')}>
                    <img
                        src={data.image.split(',')[0]}
                        alt="Product"
                        onLoad={() => {
                            setLoading(false);
                        }}
                    />
                </div>
                <div>
                    <div className={cx('product-title')}>
                        <div className={cx('product-name')}>{data.name}</div>
                        <FreeShipIcon />
                    </div>
                    <div className={cx('price')}>
                        <div className={cx('product-oldprice')}>
                            <NumericFormat
                                value={data.oldprice}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VNĐ'}
                            />
                        </div>
                        <div className={cx('product-price')}>
                            <NumericFormat
                                value={data.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VNĐ'}
                            />
                        </div>
                    </div>
                </div>
            </Link>
            <div className={cx('discount')}>
                <p>Giảm {discount}%</p>
            </div>
        </div>
    );
}
