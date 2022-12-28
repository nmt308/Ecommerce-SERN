import axios from 'axios';

export const getProducts = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/api/products', {
            params: {
                page: currentPage,
            },
        });
        const products = res.data.products;
        const countAllProduct = res.data.countAllProduct; // All products without limit to set pageCount
        dispatch({
            type: 'GET_ALL_PRODUCTS',
            payload: { products, countAllProduct },
        });
    };
};

export const getDetailProduct = (id) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/product/detail`, {
            params: {
                id,
            },
        });
        const product = res.data.product;
        dispatch({
            type: 'GET_DETAIL_PRODUCT',
            payload: product,
        });
        return product;
    };
};

export const addProduct = (data, page) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8080/api/product/add', data);
        if (res.status === 200) {
            dispatch(getProducts(page));
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

export const updateProduct = (id, data, page) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:8080/api/product/edit/${id}`, data);
        if (res.status === 200) {
            dispatch(getProducts(page));
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

export const deleteProduct = (id, page) => {
    return async (dispatch) => {
        const res = await axios.delete(`http://localhost:8080/api/product/delete/${id}`);
        if (res.status === 200) {
            dispatch(getProducts(page));
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

export const searchProduct = (searchText, currentPage) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/product/search`, {
            params: {
                name: searchText,
                page: currentPage,
            },
        });
        return {
            result: res.data.result,
            availableProduct: res.data.availableProduct,
        };
    };
};
