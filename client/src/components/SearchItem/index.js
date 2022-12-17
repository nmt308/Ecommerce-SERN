import Style from './SearchItem.module.scss';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
function SearchItem({ data, onClick }) {
    return (
        <Link to={`/${data.name}-detail`} className={Style.wrapper} onClick={onClick}>
            <div className={Style.avatar}>
                <img src={data.url} alt={data.name} />
            </div>
            <div className={Style.info}>
                <h4 className={Style.name}>
                    <span>{data.name}</span>
                </h4>
                <span className={Style.price}>
                    <NumericFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
                </span>
            </div>
        </Link>
    );
}

export default SearchItem;
