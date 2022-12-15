import axios from 'axios';

export const getCategories = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/api/categories', {
            params: {
                page: currentPage,
            },
        });
        const categories = res.data.categories;
        const countAllCategory = res.data.countAllCategory; // All categories without limit to set pageCount
        dispatch({
            type: 'GET_ALL_CATEGORIES',
            payload: { categories, countAllCategory },
        });
    };
};

export const getDetailCategory = (id) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/category/detail/${id}`);
        const category = res.data.category;
        dispatch({
            type: 'GET_DETAIL_CATEGORY',
            payload: category,
        });
        return category;
    };
};

export const addCategory = (data, page) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8080/api/category/add', data);
        if (res.status === 200) {
            dispatch(getCategories(page));
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

export const updateCategory = (id, data, page) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:8080/api/category/edit/${id}`, data);
        if (res.status === 200) {
            dispatch(getCategories(page));
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

export const deleteCategory = (id, page) => {
    return async (dispatch) => {
        const res = await axios.delete(`http://localhost:8080/api/category/delete/${id}`);
        console.log(res);
        if (res.status === 200) {
            dispatch(getCategories(page));
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

export const searchCategory = (searchText, currentPage) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/category/search`, {
            params: {
                name: searchText,
                page: currentPage,
            },
        });
        return {
            result: res.data.result,
            availableCategory: res.data.availableCategory,
        };
    };
};
