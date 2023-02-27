import { Link } from 'react-router-dom';

import './ArticleItem.scss';
export default function ArticleItem({ data, showDescription = true, showTag = true }) {
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
    return (
        <div className="card">
            <div className="card-header p-0 position-relative">
                <Link to={`/article/${data.id}`}>
                    <img
                        className="card-img-bottom d-block radius-image-full"
                        src={data.image}
                        alt={data.name}
                        height={250}
                    />
                </Link>
            </div>
            <div className="card-body">
                <div>
                    <div className="card-tag">Tin công nghệ</div>
                </div>
                <Link to={`/article/${data.id}`} className="card-title">
                    {data.title}
                </Link>

                <div className="author align-items-center mt-2 mb-1">
                    <span className="meta-value">Ngày đăng bài {formatDate(data.createdAt)} </span>
                </div>
            </div>
        </div>
    );
}
