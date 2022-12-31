import axios from 'axios';

export const getProducts = (params, offset) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/search`, {
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
