import Skeleton from '@mui/material/Skeleton';
export default function CategorySkeleton() {
    return (
        <div className="col">
            <div className="category-item">
                <div className="category-image">
                    <Skeleton width="80px" height="80px" style={{ margin: '0 auto' }} />
                </div>
                <div>
                    <Skeleton width="80px" height="16px" style={{ margin: '0 auto' }} />
                </div>
            </div>
        </div>
    );
}
