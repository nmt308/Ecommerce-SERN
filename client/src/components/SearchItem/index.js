import Style from './SearchItem.module.scss';
import { NumericFormat } from 'react-number-format';

function SearchItem({ data, onClick }) {
    return (
        <div className={Style.wrapper} onClick={onClick}>
            <div className={Style.avatar}>
                <img src={data.image} alt={data.name} />
            </div>
            <div className={Style.info}>
                <div className={Style.name}>{data.name}</div>
                <span className={Style.price}>
                    <NumericFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
                </span>
            </div>
        </div>
    );
}

export default SearchItem;
