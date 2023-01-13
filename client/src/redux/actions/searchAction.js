import request from '../../utils/request';

export const getProducts = (params, offset = 0) => {
    return async (dispatch) => {
        const res = await request.get(`/search`, {
            params: {
                ...params,
                offset,
            },
        });
        if (offset === 0) {
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data.result,
            });
        } else {
            dispatch({
                type: 'LOAD_MORE_PRODUCTS',
                payload: res.data.result,
            });
        }

        return res;
    };
};
