import Style from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
import { MDBBtn } from 'mdb-react-ui-kit';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';

const cx = classNames.bind(Style);
function CartItem({ data, deleteProduct, increaseQty, decreaseQty }) {
    return (
        <div className={cx('item')}>
            <div className={cx('image')}>
                <img src={data.image} alt={data.name} />
            </div>
            <div className={cx('detail')}>
                <div className={cx('name')}>{data.name}</div>
                <div className={cx('price')}>
                    <NumericFormat
                        value={data.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Giá: '}
                        suffix={' VNĐ'}
                    />
                </div>
            </div>
            <div className={cx('quantity')}>
                <button className={cx('btn')}>
                    <BsDashLg />
                </button>
                <div>0</div>
                <button className={cx('btn')}>
                    <BsPlusLg />
                </button>
            </div>
            <MDBBtn rounded className={cx('remove')} onClick={deleteProduct}>
                Xóa
            </MDBBtn>
        </div>
    );
}

export default CartItem;
