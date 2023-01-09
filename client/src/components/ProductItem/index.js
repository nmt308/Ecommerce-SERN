import Style from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import FreeShipIcon from '../../assets/icon/freeship';
import { NumericFormat } from 'react-number-format';
import { useState } from 'react';
import { useNavigateSearch } from '../../CustomHook';

const cx = classNames.bind(Style);
export default function ProductItem({ data, width }) {
    const discount = 100 - Math.ceil((data.price / data.oldprice) * 100);
    const [loading, setLoading] = useState(true);
    const navigateSearch = useNavigateSearch();

    return (
        <div
            className={cx('product-item')}
            style={{ width: width }}
            onClick={() => {
                navigateSearch('/detail', { name: data.name });
            }}
        >
            <div
                className={cx('product-img', {
                    default: loading,
                })}
            >
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

            <div className={cx('discount')}>
                <p>Giảm {discount}%</p>
            </div>
        </div>
    );
}
