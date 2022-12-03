import axios from 'axios';

export const getAllProduct = () => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/api/products');
        const products = res.data.products;
        dispatch({
            type: 'GET_ALL_PRODUCTS',
            payload: products,
        });
    };
};

export const getDetailProduct = (id) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/product/detail/${id}`);
        const product = res.data.product;
        dispatch({
            type: 'GET_DETAIL_PRODUCT',
            payload: product,
        });
        return product;
    };
};

export const addProduct = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8080/api/product/add', data);
        if (res.status === 200) {
            dispatch(getAllProduct());
            return {
                type: 'success',
                message: res.data.message,
            };
        } else {
            return {
                type: 'error',
                message: res.data.message,
            };
        }
    };
};

export const updateProduct = (id, data) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:8080/api/product/edit/${id}`, data);
        if (res.status === 200) {
            dispatch(getAllProduct());
            return {
                type: 'success',
                message: res.data.message,
            };
        } else {
            return {
                type: 'error',
                message: res.data.message,
            };
        }
    };
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        const res = await axios.delete(`http://localhost:8080/api/product/delete/${id}`);
        if (res.status === 200) {
            dispatch(getAllProduct());
            return {
                type: 'success',
                message: res.data.message,
            };
        } else {
            return {
                type: 'error',
                message: res.data.message,
            };
        }
    };
};

export const searchProduct = (searchText) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/product/search`, {
            params: {
                name: searchText,
            },
        });

        return res.data.result;
    };
};
