const initialState = {
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
        default:
            return state;
    }
};
export default headerReducer;
