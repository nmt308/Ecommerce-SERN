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
//CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
import CheckboxesTags from '../CheckboxTags';
import './Modal.scss';
//Redux
import { useDispatch } from 'react-redux';
import { addArticle, getDetailArticle, updateArticle } from '../../redux/actions/articleAction';
import request from '../../utils/request';
import SearchItem from '../SearchItem';

function ModalArticle({ modalAdd, setModalAdd, modalUpdate, setModalUpdate, toggleShow, modalType, idArticle }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [listCheckbox, setListCheckbox] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const inputField = useRef();
    const URLImageLocal = useRef();
    const type = ['image/png', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/jpg', 'image/webp'];
    const nameParam = searchParams.get('name');
    const pageParam = searchParams.get('page');

    let navigation = useNavigate();
    let dispatch = useDispatch();

    const handleCheckbox = (e, value) => {
        const listIdProducts = value.map((product) => product.id);
        setListCheckbox(listIdProducts);
    };

    const resetInputModal = () => {
        setName('');
        setContent('');
        setImage(null);
        setListCheckbox([]);
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
        const storageRef = ref(storage, `article-img/${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(ref(storage, storageRef));
        const data = {
            title: name,
            image: url,
            content,
            listProducts: listCheckbox,
        };

        const res = await dispatch(addArticle(data, pageParam));

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
            const storageRef = ref(storage, `article-img/${image.name}`);
            await uploadBytes(storageRef, image);
            url = await getDownloadURL(ref(storage, storageRef));
        }
        const data = {
            title: name,
            image: url ? url : image,
            content,
            listProducts: listCheckbox,
        };

        const res = await dispatch(updateArticle(idArticle, data, pageParam));
        notify(res.type, res.message);
        setLoading(false);
        setModalUpdate(!modalUpdate);
        resetInputModal();
        inputField.current.value = null;
        if (nameParam) {
            navigation('/admin/article');
        }
    };

    useEffect(() => {
        request
            .get('/products', {
                params: {
                    limit: 100,
                },
            })
            .then((res) => {
                setProducts(res.data.products);
            });
    }, [modalType]);
    useEffect(() => {
        const getProduct = async () => {
            if (modalType === 'Update') {
                const article = await dispatch(getDetailArticle(idArticle));
                setName(article.title);
                setImage(article.image);
                setContent(article.content);
                setListCheckbox(article.listProducts);
                console.log('detail', article);

                // setListCheckbox(article.)
            }
            if (modalType === 'Add') {
                resetInputModal();
            }
        };
        getProduct();
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
                        <MDBModalTitle>{modalType === 'Add' ? 'Thêm bài viết' : 'Chi tiết bài viết'}</MDBModalTitle>
                    </MDBModalHeader>

                    <MDBModalBody>
                        <MDBInput
                            placeholder="Nhập tên bài viết"
                            label="Tên bài viết"
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <p>
                            Ảnh bài viết
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

                        <p style={{ marginTop: '20px' }}>Nội dung bài viết</p>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                            onBlur={(event, editor) => {}}
                            onFocus={(event, editor) => {}}
                        />
                        <p style={{ marginTop: '20px' }}>Sản phẩm trong bài</p>
                        {listCheckbox.length > 0 && modalType === 'Update' ? (
                            listCheckbox.map((product) => (
                                <SearchItem
                                    data={product.Product}
                                    onClick={() => {
                                        navigation(`/detail?name=${product.Product.name}`);
                                    }}
                                />
                            ))
                        ) : (
                            <CheckboxesTags data={products} modalType={modalType} event={handleCheckbox} />
                        )}
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

export default ModalArticle;
