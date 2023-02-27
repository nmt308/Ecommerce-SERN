import request from '../../utils/request';

export const getArticles = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await request.get('/articles', {
            params: {
                page: currentPage,
            },
        });
        const articles = res.data.articles;
        console.log('res', articles);
        const countAllArticle = res.data.countAllArticle; // All articles without limit to set pageCount
        dispatch({
            type: 'GET_ALL_ARTICLES',
            payload: { articles, countAllArticle },
        });
    };
};

export const getDetailArticle = (id) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await request.get(`/article/detail/${id}`);
        const article = res.data.article;
        dispatch({
            type: 'GET_DETAIL_ARTICLE',
            payload: article,
        });
        return article;
    };
};

export const addArticle = (data, page) => {
    return async (dispatch) => {
        const res = await request.post('/article/add', data);
        console.log(res);
        if (res.status === 200) {
            dispatch(getArticles(page));
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

export const updateArticle = (id, data, page) => {
    return async (dispatch) => {
        const res = await request.put(`/article/edit/${id}`, data);
        if (res.status === 200) {
            dispatch(getArticles(page));
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

export const deleteArticle = (id, page) => {
    return async (dispatch) => {
        const res = await request.delete(`/article/delete/${id}`);
        console.log(res);
        if (res.status === 200) {
            dispatch(getArticles(page));
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

export const searchArticle = (searchText, currentPage) => {
    return async (dispatch) => {
        const res = await request.get(`/article/search`, {
            params: {
                name: searchText,
                page: currentPage,
            },
        });
        return {
            result: res.data.result,
            availableArticle: res.data.availableArticle,
        };
    };
};
