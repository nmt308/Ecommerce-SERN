import axios from 'axios';

export const getBrands = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/api/brands', {
            params: {
                page: currentPage,
            },
        });
        const brands = res.data.brands;
        const countAllBrand = res.data.countAllBrand; // All brands without limit to set pageCount
        dispatch({
            type: 'GET_ALL_BRANDS',
            payload: { brands, countAllBrand },
        });
    };
};

export const getDetailBrand = (id) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/brand/detail/${id}`);
        const brand = res.data.brand;
        dispatch({
            type: 'GET_DETAIL_BRAND',
            payload: brand,
        });
        return brand;
    };
};

export const addBrand = (data, page) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8080/api/brand/add', data);
        if (res.status === 200) {
            dispatch(getBrands(page));
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

export const updateBrand = (id, data, page) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:8080/api/brand/edit/${id}`, data);
        if (res.status === 200) {
            dispatch(getBrands(page));
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

export const deleteBrand = (id, page) => {
    return async (dispatch) => {
        const res = await axios.delete(`http://localhost:8080/api/brand/delete/${id}`);
        if (res.status === 200) {
            dispatch(getBrands(page));
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

export const searchBrand = (searchText, currentPage) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/brand/search`, {
            params: {
                name: searchText,
                page: currentPage,
            },
        });
        return {
            result: res.data.result,
            availableBrand: res.data.availableBrand,
        };
    };
};
