const initialState = {
    brands: [],
    brand: {},
    totalBrand: 1,
};

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_BRANDS':
            return {
                ...state,
                brands: action.payload.brands,
                totalBrand: action.payload.countAllBrand,
            };

        case 'GET_DETAIL_BRAND':
            return {
                ...state,
                brand: action.payload,
            };
        default:
            return state;
    }
};

export default brandReducer;
