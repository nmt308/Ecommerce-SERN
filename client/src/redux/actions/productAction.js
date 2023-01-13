import request from '../../utils/request';

export const getProducts = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await request.get('/products', {
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
        const res = await request.get(`/product/detail`, {
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
        const res = await request.post('/product/add', data);
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
        const res = await request.put(`/product/edit/${id}`, data);
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
        const res = await request.delete(`/product/delete/${id}`);
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
        const res = await request.get(`/product/search`, {
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
