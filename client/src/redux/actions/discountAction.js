import axios from 'axios';

export const getDiscounts = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/api/discounts', {
            params: {
                page: currentPage,
            },
        });
        const discounts = res.data.discounts;
        const countAllDiscount = res.data.countAllDiscount; // All discounts without limit to set pageCount
        dispatch({
            type: 'GET_ALL_DISCOUNTS',
            payload: { discounts, countAllDiscount },
        });
    };
};

export const getDetailDiscount = (id) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/discount/detail/${id}`);
        const discount = res.data.discount;
        dispatch({
            type: 'GET_DETAIL_DISCOUNT',
            payload: discount,
        });
        return discount;
    };
};

export const addDiscount = (data, page) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8080/api/discount/add', data);
        if (res.status === 200) {
            dispatch(getDiscounts(page));
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

export const updateDiscount = (id, data, page) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:8080/api/discount/edit/${id}`, data);
        if (res.status === 200) {
            dispatch(getDiscounts(page));
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

export const deleteDiscount = (id, page) => {
    return async (dispatch) => {
        const res = await axios.delete(`http://localhost:8080/api/discount/delete/${id}`);
        if (res.status === 200) {
            dispatch(getDiscounts(page));
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

export const searchDiscount = (searchText, currentPage) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/discount/search`, {
            params: {
                name: searchText,
                page: currentPage,
            },
        });
        return {
            result: res.data.result,
            availableDiscount: res.data.availableDiscount,
        };
    };
};
