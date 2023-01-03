import axios from 'axios';
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
            const res = await axios.get('http://localhost:8080/api/search', {
                params: {
                    cartProduct: listProduct,
                },
            });

            dispatch({
                type: 'GET_CART_PRODUCT',
                payload: res.data.result,
            });
        } else {
            dispatch({
                type: 'GET_CART_PRODUCT',
                payload: [],
            });
        }
    };
};
