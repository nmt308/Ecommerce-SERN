const initialState = {
    user: {
        email: '',
        name: '',
        isLoading: true,
    },

    cartQuantity: 0,
    cartProducts: [],
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_CHANGE':
            return {
                ...state,
                cartQuantity: action.payload,
            };
        case 'GET_CART_PRODUCT':
            return {
                ...state,
                cartProducts: action.payload,
            };
        case 'GET_USER':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
export default headerReducer;
