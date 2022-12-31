const initState = {
    products: [],
};
const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                products: action.payload,
            };
        case 'LOAD_MORE_PRODUCTS':
            return {
                products: [...state.products, ...action.payload],
            };
        default:
            return state;
    }
};
export default searchReducer;
