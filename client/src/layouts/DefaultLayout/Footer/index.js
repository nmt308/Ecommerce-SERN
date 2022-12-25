import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import LogoIcon from '../../../assets/icon/logoIcon.png';

function Footer() {
    return (
        <MDBFooter className="text-center text-lg-start text-muted" style={{ backgroundColor: '#fff' }}>
            <MDBContainer className="text-center text-md-start mt-2">
                <section className="d-flex justify-content-center justify-content-lg-between py-3 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a
                            href="//www.facebook.com/nmt.3008"
                            target="_blank"
                            className="px-3 text-reset"
                            rel="noreferrer"
                        >
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a
                            href="https://www.instagram.com/nmt300801/"
                            target="_blank"
                            className="px-3 text-reset"
                            rel="noreferrer"
                        >
                            <MDBIcon fab icon="instagram" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/minh-th%C3%A0nh-nguy%E1%BB%85n-a16a57251/"
                            target="_blank"
                            className="px-3 text-reset"
                            rel="noreferrer"
                        >
                            <MDBIcon fab icon="linkedin" />
                        </a>
                        <a
                            href="https://github.com/nmt308"
                            target="_blank"
                            className="px-3 text-reset"
                            rel="noreferrer"
                        >
                            <MDBIcon fab icon="github" />
                        </a>
                    </div>
                </section>
            </MDBContainer>

            <section className="">
                <MDBContainer className="text-center text-md-start mt-5">
                    <MDBRow className="mt-3">
                        <MDBCol md="5" lg="5" className="mb-4">
                            <div className="text-uppercase fw-bold mb-4">
                                <img src={LogoIcon} alt="Logo" width={28} height={28} />
                                <span className="ms-2">NowShop Corporation</span>
                            </div>
                            <p>
                                Mỗi khách hàng là một con người – một cá thể riêng biệt, cần được tôn trọng, quan tâm và
                                lắng nghe, thấu hiểu và phục vụ một cách riêng biệt. NowShop sẽ là nơi hiểu được nhu cầu
                                của khách hàng hơn bất kỳ công ty nào khác.
                            </p>
                        </MDBCol>
                        <MDBCol className="col-md-1 col-lg-1 d-none d-sm-none d-md-none d-lg-block mb-4"></MDBCol>
                        <MDBCol md="3" lg="3" className="mx-auto  mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">TRANG KHÁC</h6>
                            <p>
                                <a href="#!" className="text-reset">
                                    Chính sách
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Điều khoản
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Hỗ trợ
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Khác
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" className="mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">LIÊN HỆ</h6>
                            <p>
                                <MDBIcon icon="home" className="me-4" />
                                Q.Tân Bình, TP.Hồ Chí Minh
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-4" />
                                minhthanh0946@gmail.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-4" />+ 84 92 2828 411
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className="text-center p-3" style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}>
                © 2022 Copyright: Nguyễn Minh Thành
            </div>
        </MDBFooter>
    );
}

export default Footer;
