import './Form.scss';
import HandleSignUp from './handleSignUp';
import HandleSignIn from './handleSignIn';
import LogoWeb from '../../assets/img/logoWeb.png';
/*Toastify*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*MDB*/
import { MDBValidationItem, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Form({ type }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    return (
        <div className="container-fluid form-login">
            <div className="container">
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src={LogoWeb} className="img-fluid" alt="logo"></img>
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Đăng nhập với</p>
                                    <MDBBtn floating className="mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </MDBBtn>
                                    <MDBBtn floating className="mx-1">
                                        <i className="fa-solid fa-envelope"></i>
                                    </MDBBtn>
                                    <MDBBtn floating className="mx-1">
                                        <i className="fa-brands fa-twitter"></i>
                                    </MDBBtn>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Hoặc</p>
                                </div>

                                {type === 'register' && (
                                    <MDBValidationItem className="col-md-12 mb-4">
                                        <MDBInput
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            placeholder="Ex: Nguyen Van A"
                                            label="Họ tên"
                                            className="form-control-lg"
                                        />
                                    </MDBValidationItem>
                                )}

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="Ex: abc@gmail.com"
                                        label="Email"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="Nhập mật khẩu của bạn"
                                        label="Mật khẩu"
                                        type="password"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>
                                    {type === 'login' && <Link style={{ color: '#000' }}>Quên mật khẩu</Link>}
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    {type === 'register' ? (
                                        <>
                                            <MDBBtn
                                                className="btn-lg"
                                                onClick={() => {
                                                    HandleSignUp(name, email, password, navigate);
                                                }}
                                            >
                                                Đăng kí
                                            </MDBBtn>
                                            <div className="small fw-bold mt-2 pt-1 mb-0">
                                                Đã có tài khoản ?{' '}
                                                <Link to="/login" className="link-danger">
                                                    Đăng nhập ngay
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <MDBBtn
                                                className="btn-lg"
                                                onClick={() => {
                                                    HandleSignIn(email, password, navigate);
                                                }}
                                            >
                                                Đăng nhập
                                            </MDBBtn>
                                            <div className="small fw-bold mt-2 pt-1 mb-0">
                                                Chưa có tài khoản ?{' '}
                                                <Link to="/register" className="link-danger">
                                                    Đăng kí ngay
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Form;
