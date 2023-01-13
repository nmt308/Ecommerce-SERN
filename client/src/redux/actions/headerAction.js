import request from '../../utils/request';
export const cartChange = () => {
    return (dispatch) => {
        const cartQuantity = JSON.parse(localStorage.getItem('cart')).length || 0;
        dispatch({
            type: 'CART_CHANGE',
            payload: cartQuantity,
        });
    };
};

export const getCartProduct = (listProduct) => {
    return async (dispatch) => {
        if (listProduct.length > 0) {
            const res = await request.get('/search', {
                params: {
                    cartProduct: listProduct,
                },
            });
            dispatch({
                type: 'GET_CART_PRODUCT',
                payload: res.data.result,
            });
            return true;
        } else {
            dispatch({
                type: 'GET_CART_PRODUCT',
                payload: [],
            });
            return true;
        }
    };
};

export const getUser = (email) => {
    return async (dispatch) => {
        if (email) {
            const res = await request.get('/user/detail', {
                params: {
                    email: email,
                },
            });
            const name = res.data.user.name;
            const role = res.data.user.role;

            dispatch({
                type: 'GET_USER',
                payload: {
                    email,
                    name,
                    role: role,
                    isLoading: false,
                },
            });
        } else {
            dispatch({
                type: 'GET_USER',
                payload: {
                    email: '',
                    name: '',
                    role: '',
                    isLoading: false,
                },
            });
        }
    };
};
