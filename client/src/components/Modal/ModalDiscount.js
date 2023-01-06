//MDB5
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
//React
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
//Toastify
import notify from '../Toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Firestore
import { storage } from '../../config/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
//Local
import ImageDefault from '../../assets/img/defaultimage.png';
import './Modal.scss';
//Redux
import { useDispatch } from 'react-redux';
import { addDiscount, getDetailDiscount, updateDiscount } from '../../redux/actions/discountAction';

function ModalDiscount({ modalAdd, setModalAdd, modalUpdate, setModalUpdate, toggleShow, modalType, idDiscount }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const inputField = useRef(); //Reset input file
    const URLImageLocal = useRef(); //Lặp qua URLImageLocal để hiển thị hình khi Add

    const type = ['image/png', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/jpg'];
    const nameParam = searchParams.get('name');
    const pageParam = searchParams.get('page');
    let navigation = useNavigate();
    let dispatch = useDispatch();

    const resetInputModal = () => {
        setName('');
        setImage(null);
    };

    const handleImage = (e) => {
        let image = e.target.files[0];
        URLImageLocal.current = URL.createObjectURL(image);
        if (image && type.includes(image.type)) {
            setImage(image);
        } else {
            notify('warning', 'Kiểm tra lại hình ảnh');
            setImage(null);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!name) {
            setLoading(false);
            notify('warning', 'Vui lòng nhập đủ các giá trị');
            return;
        }
        if (image == null) {
            setLoading(false);
            notify('warning', 'Vui lòng tải lại ảnh');
            return;
        }
        const storageRef = ref(storage, `banner-img/${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(ref(storage, storageRef));
        const data = {
            name,
            image: url,
        };
        console.log(data);

        const res = await dispatch(addDiscount(data, pageParam));
        notify(res.type, res.message);
        setLoading(false);
        setModalAdd(!modalAdd);
        resetInputModal();
        inputField.current.value = null;
    };

    const handleUpdate = async () => {
        setLoading(true);
        let url;
        if (!name) {
            setLoading(false);
            notify('warning', 'Vui lòng nhập đủ các giá trị');
            return;
        }
        if (typeof image !== 'string') {
            setLoading(false);
            const storageRef = ref(storage, `banner-img/${image.name}`);
            await uploadBytes(storageRef, image);
            url = await getDownloadURL(ref(storage, storageRef));
        }
        const data = {
            name,
            image: url ? url : image,
        };

        const res = await dispatch(updateDiscount(idDiscount, data, pageParam));
        notify(res.type, res.message);
        setLoading(false);
        setModalUpdate(!modalUpdate);
        resetInputModal();
        inputField.current.value = null;
        if (nameParam) {
            navigation('/admin/banner');
        }
    };

    useEffect(() => {
        const getBanner = async () => {
            if (modalType === 'Update') {
                const discount = await dispatch(getDetailDiscount(idDiscount));
                setName(discount.name);
                setImage(discount.image);
            }
            if (modalType === 'Add') {
                resetInputModal();
            }
        };
        getBanner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalType]);

    return (
        <MDBModal
            show={modalAdd || modalUpdate}
            setShow={modalType === 'Add' ? setModalAdd : setModalUpdate}
            tabIndex="-1"
        >
            <MDBModalDialog
                style={{
                    margin: '4rem auto',
                }}
            >
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{modalType === 'Add' ? 'Thêm khuyến mãi' : 'Chi tiết khuyến mãi'}</MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            placeholder="Nhập tên khuyến mãi"
                            label="Tên khuyến mãi"
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <p>
                            Ảnh khuyến mãi
                            <mark style={{ fontSize: '14px', padding: '0', marginLeft: '4px' }}>( Tối đa 1 ảnh )</mark>
                        </p>

                        <div className="image-default">
                            {image === null ? (
                                <img src={ImageDefault} alt="default" />
                            ) : modalType === 'Add' ? (
                                typeof image === 'string' ? (
                                    <img src={ImageDefault} alt="default" />
                                ) : (
                                    <img src={URLImageLocal.current} alt="default" />
                                )
                            ) : typeof image === 'string' ? (
                                <img src={image} alt="default" />
                            ) : (
                                <img src={URLImageLocal.current} alt="default" />
                            )}
                        </div>

                        <input
                            className="form-control"
                            ref={inputField}
                            type="file"
                            onChange={(e) => {
                                handleImage(e);
                            }}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn
                            color="danger"
                            onClick={() => {
                                toggleShow(modalType);
                            }}
                        >
                            Hủy
                        </MDBBtn>
                        {modalType === 'Add' ? (
                            <MDBBtn onClick={handleSubmit} color="success" disabled={loading}>
                                <div style={{ minWidth: '60px' }}>
                                    {loading ? <AiOutlineLoading3Quarters className="loading" /> : 'Thêm mới'}
                                </div>
                            </MDBBtn>
                        ) : (
                            <MDBBtn onClick={handleUpdate} color="success" disabled={loading}>
                                <div style={{ minWidth: '60px' }}>
                                    {loading ? <AiOutlineLoading3Quarters className="loading" /> : 'Cập nhật'}
                                </div>
                            </MDBBtn>
                        )}
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
            {(modalAdd || modalUpdate) && <ToastContainer />}
        </MDBModal>
    );
}

export default ModalDiscount;
