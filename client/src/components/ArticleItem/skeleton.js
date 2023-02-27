import { Skeleton } from '@mui/material';
export default function SkeletonLoading() {
    return (
        <div className="card" style={{ paddingTop: '20px' }}>
            <Skeleton
                className="card-img-bottom d-block radius-image-full ml-auto mr-auto articleItem-skeleton"
                height="150px"
                width="90%"
            />

            <div className="card-body blog-details">
                <Skeleton className="label-blue" />
                <Skeleton className="news-title blog-desc" />
                <Skeleton className="news-desc" width="50%" />

                <div className="author align-items-center mt-2 mb-1">
                    <ul className="blog-meta">
                        <li>
                            <Skeleton width="70%" style={{ marginTop: '12px' }} />
                        </li>
                        <li className="meta-item blog-lesson">
                            <Skeleton className="meta-value" />

                            <span className="meta-value ml-2">
                                <Skeleton width="40%" />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
