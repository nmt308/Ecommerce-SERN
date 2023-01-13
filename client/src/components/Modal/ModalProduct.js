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
import request from '../../utils/request';
//Toastify
import notify from '../Toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Firestore
import { storage } from '../../config/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
//Local
import ImageDefault from '../../assets/img/defaultimage.png';
import './Modal.scss';
//Redux
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct, getDetailProduct } from '../../redux/actions/productAction';

function ModalProduct({ modalAdd, setModalAdd, modalUpdate, setModalUpdate, toggleShow, modalType, idProduct }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [oldprice, setOldPrice] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const inputField = useRef(); //Reset input file
    const listBrands = useRef([]);
    const listCategories = useRef([]);
    const URLImageLocal = useRef([]); //Lặp qua URLImageLocal để hiển thị hình khi Add
    let listImages = []; //Lặp qua listImages để up hình lên Firestore

    const type = ['image/png', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/jpg'];
    const nameParam = searchParams.get('name');
    const pageParam = searchParams.get('page');

    let navigation = useNavigate();
    let dispatch = useDispatch();

    const resetInputModal = () => {
        setName('');
        setOldPrice('');
        setBrand('');
        setCategory('');
        setPrice('');
        setDescription('');
        setSpecification('');
        setImage(null);
        setQuantity('');
        URLImageLocal.current = [];
    };

    const handleImage = (e) => {
        let images = e.target.files;
        if (images.length > 5) {
            notify('error', 'Tối đa 5 hình ảnh !');
            inputField.current.value = null;
            return;
        }
        for (let i = 0; i < images.length; i++) {
            listImages.push(images[i]);
            let url = URL.createObjectURL(images[i]);
            URLImageLocal.current.push(url);
            if (images && type.includes(images[i].type)) {
                setImage(listImages);
            } else {
                notify('warning', 'Kiểm tra lại hình ảnh');
                setImage(null);
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (oldprice < price) {
            setLoading(false);
            notify('warning', 'Giá giảm phải nhỏ hơn giá gốc');
            return;
        }
        if (!name || !description || !price || !oldprice || !specification || !quantity) {
            setLoading(false);
            notify('warning', 'Vui lòng nhập đủ các giá trị');
            return;
        }

        if (image === null) {
            setLoading(false);
            notify('error', 'Kiểm tra lại hình ảnh !');
            return;
        }

        const handleUploadImage = () => {
            let listUrls = [];
            return new Promise(async (resolve) => {
                //Bất đồng bộ nên dùng promise mới dùng await được
                for (const [index, file] of image.entries()) {
                    const storageRef = ref(storage, `product-img/${file.name}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(ref(storage, storageRef));
                    listUrls.push(url);
                    if (index === image.length - 1) {
                        resolve(listUrls);
                    }
                }
            });
        };

        const getDownloadURLS = await handleUploadImage();

        const data = {
            name,
            oldprice,
            price,
            image: `${getDownloadURLS}`,
            quantity,
            brand: brand || listBrands.current[0].id,
            category: category || listCategories.current[0].id,
            specification,
            description,
        };

        const res = await dispatch(addProduct(data, pageParam));
        notify(res.type, res.message);
        setLoading(false);
        setModalAdd(!modalAdd);
        resetInputModal();
        inputField.current.value = null;
    };

    const handleUpdate = async () => {
        setLoading(true);
        let getDownloadURLS;

        if (oldprice < price) {
            setLoading(false);
            notify('warning', 'Giá giảm phải nhỏ hơn giá gốc');
            return;
        }
        if (!name || !description || !price || !oldprice || !specification || !quantity) {
            setLoading(false);
            notify('warning', 'Vui lòng nhập đủ các giá trị');
            return;
        }

        if (typeof image !== 'string') {
            // image là object khi up hình mới
            const handleUploadImage = () => {
                let listUrls = [];
                return new Promise(async (resolve) => {
                    for (const [index, file] of image.entries()) {
                        const storageRef = ref(storage, `product-img/${file.name}`);
                        await uploadBytes(storageRef, file);
                        const url = await getDownloadURL(ref(storage, storageRef));
                        listUrls.push(url);
                        if (index === image.length - 1) {
                            resolve(listUrls);
                        }
                    }
                });
            };

            getDownloadURLS = await handleUploadImage();
        }

        const data = {
            name,
            oldprice,
            price,
            image: getDownloadURLS ? `${getDownloadURLS}` : image,
            quantity,
            brand,
            category,
            specification,
            description,
        };

        const res = await dispatch(updateProduct(idProduct, data, pageParam));
        notify(res.type, res.message);
        setLoading(false);
        setModalUpdate(!modalUpdate);
        resetInputModal();
        inputField.current.value = null;
        if (nameParam) {
            navigation('/admin/product');
        }
    };

    useEffect(() => {
        request
            .get('/brands', {
                params: {
                    getAll: 'true',
                },
            })
            .then((data) => {
                listBrands.current = data.data.brands;
            });
        request
            .get('/categories', {
                params: {
                    getAll: 'true',
                },
            })
            .then((data) => {
                listCategories.current = data.data.categories;
            });
    }, []);

    useEffect(() => {
        inputField.current.value = null; //Mỗi lần change modal reset input file
        setLoading(false);
        const getProduct = async () => {
            if (modalType === 'Update') {
                const product = await dispatch(getDetailProduct(idProduct));
                setName(product.name);
                setOldPrice(product.oldprice);
                setBrand(product.brand_id);
                setCategory(product.category_id);
                setPrice(product.price);
                setDescription(product.description);
                setSpecification(product.specification);
                setImage(product.image);
                setQuantity(product.quantity);
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
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{modalType === 'Add' ? 'Thêm sản phẩm' : 'Chi tiết sản phẩm'}</MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            placeholder="Nhập tên sản phẩm"
                            label="Tên sản phẩm"
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <MDBInput
                            placeholder="VNĐ"
                            label="Giá gốc"
                            type="number"
                            value={oldprice}
                            name="oldprice"
                            onChange={(e) => {
                                setOldPrice(e.target.value);
                            }}
                        />
                        <MDBInput
                            placeholder="VNĐ"
                            label="Giá giảm"
                            type="number"
                            value={price}
                            name="price"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                        <MDBInput
                            placeholder="Số lượng hiện có"
                            label="Số lượng"
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => {
                                if (e.target.value < 1) {
                                    return;
                                }
                                setQuantity(e.target.value);
                            }}
                        />

                        <p>
                            Ảnh sản phẩm
                            <mark style={{ fontSize: '14px', padding: '0', marginLeft: '4px' }}>
                                ( Tối đa 5 ảnh, ảnh đầu là ảnh đại diện )
                            </mark>
                        </p>

                        <div className="image-default">
                            {/* 1. Kiểm tra cả 2 modal image có null không
                           2. Sau đó render ra kiểu image theo modal
                           3. Ở modal Add check thêm lần nữa vì image chưa được re-render */}

                            {image === null ? (
                                <img src={ImageDefault} alt="default" />
                            ) : modalType === 'Add' ? (
                                typeof image === 'string' ? (
                                    <img src={ImageDefault} alt="default" />
                                ) : (
                                    image.map((image, index) => (
                                        <img key={index} src={URLImageLocal.current[index]} alt="default" />
                                    ))
                                )
                            ) : typeof image === 'string' ? (
                                image.split(',').map((image, index) => {
                                    return <img key={index} src={image} alt="default" />;
                                })
                            ) : (
                                image.map((image, index) => (
                                    <img key={index} src={URLImageLocal.current[index]} alt="default" />
                                ))
                            )}
                        </div>

                        <input
                            className="form-control"
                            ref={inputField}
                            type="file"
                            multiple
                            onChange={(e) => {
                                handleImage(e);
                            }}
                        />
                        <p style={{ marginTop: '18px' }}>Mô tả</p>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                            }}
                            onBlur={(event, editor) => {}}
                            onFocus={(event, editor) => {}}
                        />
                        <p>Cấu hình</p>
                        <CKEditor
                            editor={ClassicEditor}
                            data={specification}
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setSpecification(data);
                            }}
                            onBlur={(event, editor) => {}}
                            onFocus={(event, editor) => {}}
                        />
                        <p>Thương hiệu</p>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                        >
                            {listBrands.current.map((brand) => {
                                return (
                                    <option value={brand.id} key={brand.id}>
                                        {brand.name}
                                    </option>
                                );
                            })}
                        </select>
                        <p>Danh mục</p>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            value={category}
                        >
                            {listCategories.current.map((category) => {
                                return (
                                    <option value={category.id} key={category.id}>
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
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

export default ModalProduct;
