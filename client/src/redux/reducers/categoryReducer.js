const initialState = {
    categories: [],
    category: {},
    totalCategory: 1,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_CATEGORIES':
            return {
                ...state,
                categories: action.payload.categories,
                totalCategory: action.payload.countAllCategory,
            };

        case 'GET_DETAIL_CATEGORY':
            return {
                ...state,
                category: action.payload,
            };
        default:
            return state;
    }
};

export default categoryReducer;
