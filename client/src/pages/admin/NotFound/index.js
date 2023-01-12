import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../config/Firebase';
import { getUser } from '../../../redux/actions/headerAction';
import Caution from '../../../assets/img/caution1.png';
import './NotFound.scss';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
function NotFound() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged(async (res) => {
            if (!res) {
                dispatch(getUser());
            } else {
                dispatch(getUser(res.email));
            }
        });
    }, []);
    return (
        <div className="notfound">
            <img src={Caution} alt="404" className="w-50" />
            <h5>OOPS! - KHÔNG TÌM THẤY TRANG</h5>
            <h6>
                Thiết bị của bạn không hỗ trợ sử dụng Admin Control Panel, vui lòng sử dụng thiết bị có kích thước lớn
                hơn ({'>'}650px) để trải nghiệm tốt nhất
            </h6>
            <MDBBtn
                rounded
                onClick={() => {
                    navigate('/');
                }}
            >
                Về trang chủ
            </MDBBtn>
        </div>
    );
}
export default NotFound;
