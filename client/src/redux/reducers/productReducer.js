const initialState = {
    products: [],
    product: {},
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };

        case 'GET_DETAIL_PRODUCT':
            return {
                ...state,
                product: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;
