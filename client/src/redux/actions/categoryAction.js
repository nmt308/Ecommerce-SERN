import request from '../../utils/request';

export const getCategories = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await request.get('/categories', {
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
        const res = await request.get(`/category/detail/${id}`);
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
        const res = await request.post('/category/add', data);
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
        const res = await request.put(`/category/edit/${id}`, data);
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
        const res = await request.delete(`/category/delete/${id}`);
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
        const res = await request.get(`/category/search`, {
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
