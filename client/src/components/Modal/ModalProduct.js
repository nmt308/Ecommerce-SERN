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
import axios from 'axios';
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
    const [name, setName] = useState('');
    const [oldprice, setOldPrice] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState(1);
    const [category, setCategory] = useState(1);
    const inputField = useRef(); //Reset input file
    const listBrands = useRef([]);
    const listCategories = useRef([]);
    const URLImageLocal = useRef([]); //Lặp qua URLImageLocal để hiển thị hình khi Add
    let listImages = []; //Lặp qua listImages để up hình lên Firestore
    const type = ['image/png', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/jpg'];

    let dispatch = useDispatch();

    const resetInputModal = () => {
        setName('');
        setOldPrice('');
        setBrand(1);
        setCategory(1);
        setPrice('');
        setDescription('');
        setSpecification('');
        setImage(null);
        setQuantity('');
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
                setImage(null);
            }
        }
    };

    const handleSubmit = async () => {
        if (oldprice < price) {
            notify('warning', 'Giá giảm phải nhỏ hơn giá gốc');
            return;
        }
        if (!name || !description || !price || !oldprice || !specification || !quantity) {
            notify('warning', 'Vui lòng nhập đủ các giá trị');
            return;
        }

        if (image === null) {
            notify('error', 'Kiểm tra lại hình ảnh !');
            return;
        }

        const handleUploadImage = () => {
            let listUrls = [];
            return new Promise((resolve) => {
                //Vì function này bất đồng bộ nên dùng promise
                image.forEach(async (item, index) => {
                    const storageRef = ref(storage, `product-img/${item.name}`);
                    await uploadBytes(storageRef, item);
                    const url = await getDownloadURL(ref(storage, storageRef));
                    listUrls.push(url);
                    if (index === image.length - 1) {
                        resolve(listUrls);
                    }
                });
            });
        };

        const getDownloadURLS = await handleUploadImage();

        const data = {
            name,
            oldprice,
            price,
            image: `${getDownloadURLS}`,
            quantity,
            brand,
            category,
            specification,
            description,
        };

        const res = await dispatch(addProduct(data));
        notify(res.type, res.message);
        setModalAdd(!modalAdd);
        resetInputModal();
        inputField.current.value = null;
    };

    const handleUpdate = async () => {
        let getDownloadURLS;

        if (typeof image !== 'string') {
            const handleUploadImage = () => {
                let listUrls = [];
                return new Promise((resolve) => {
                    //Vì function này bất đồng bộ nên dùng promise
                    image.forEach(async (item, index) => {
                        const storageRef = ref(storage, `product-img/${item.name}`);
                        await uploadBytes(storageRef, item);
                        const url = await getDownloadURL(ref(storage, storageRef));
                        listUrls.push(url);
                        if (index === image.length - 1) {
                            resolve(listUrls);
                        }
                    });
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

        const res = await dispatch(updateProduct(idProduct, data));
        notify(res.type, res.message);
        setModalUpdate(!modalUpdate);
        resetInputModal();
        inputField.current.value = null;
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/brands').then((data) => {
            listBrands.current = data.data.brands;
        });
        axios.get('http://localhost:8080/api/categories').then((data) => {
            listCategories.current = data.data.categories;
        });
    }, []);

    useEffect(() => {
        inputField.current.value = null; //Mỗi lần change modal reset input file
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
            <MDBModalDialog>
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
                            <MDBBtn onClick={handleSubmit} color="success">
                                Thêm mới
                            </MDBBtn>
                        ) : (
                            <MDBBtn onClick={handleUpdate} color="success">
                                Cập nhật
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
