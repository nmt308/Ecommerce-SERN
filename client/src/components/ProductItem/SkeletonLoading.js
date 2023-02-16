import Skeleton from '@mui/material/Skeleton';
import Style from './ProductItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(Style);
export default function SkeletonLoading({ width }) {
    return (
        <div className={cx('product-item')} style={{ width: width, paddingTop: '12px' }}>
            <div className={cx('product-img')}>
                <Skeleton width="100%" variant="rectangular" height="100%" />
            </div>
            <div>
                <div className={cx('product-title')}>
                    <div className={cx('product-name')}>
                        <Skeleton width="200px" height="18px" />
                        <Skeleton width="120px" height="18px" />
                    </div>
                </div>
                <div className={cx('price')}>
                    <div className={cx('product-oldprice')}>
                        <Skeleton width="80%" height="18px" />
                    </div>
                </div>
            </div>
        </div>
    );
}
