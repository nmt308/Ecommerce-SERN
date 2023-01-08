import Logo from '../../assets/icon/logoIcon.png';
import './Loading.scss';
function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center preload">
            <img src={Logo} alt="loading" width={80} height={80} />
            <div class="loadingio-spinner-double-ring-mpjt70d938o">
                <div class="ldio-kt6dudutv6">
                    <div></div>
                    <div></div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Loading;
