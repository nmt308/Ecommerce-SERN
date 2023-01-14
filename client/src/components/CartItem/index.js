import Style from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
import { MDBBtn } from 'mdb-react-ui-kit';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';
import { useNavigateSearch } from '../../CustomHook';
const cx = classNames.bind(Style);
function CartItem({ data, quantity, deleteProduct, increaseQty, decreaseQty }) {
    const navigateSearch = useNavigateSearch();
    return (
        <div className={cx('item')}>
            <div className="d-flex align-items-center w-100">
                <div className={cx('image')}>
                    <img src={data.image} alt={data.name} />
                </div>
                <div className={cx('detail')}>
                    <div
                        className={cx('name')}
                        onClick={() => {
                            navigateSearch('/detail', { name: data.name });
                        }}
                    >
                        {data.name}
                    </div>

                    <div className={cx('price')}>
                        <NumericFormat
                            value={data.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Giá: '}
                            suffix={' VNĐ'}
                        />
                    </div>
                </div>{' '}
            </div>
            <div className="d-flex align-items-center flex-fill">
                <div className={cx('quantity')}>
                    <button className={cx('btn')} onClick={decreaseQty}>
                        <BsDashLg />
                    </button>
                    <div>{quantity}</div>
                    <button className={cx('btn')} onClick={increaseQty}>
                        <BsPlusLg />
                    </button>
                </div>
                <MDBBtn rounded className={cx('remove')} onClick={deleteProduct}>
                    Xóa
                </MDBBtn>
            </div>
        </div>
    );
}

export default CartItem;
