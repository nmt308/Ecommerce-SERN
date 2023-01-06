const initialState = {
    discounts: [],
    discount: {},
    totalDiscount: 1,
};

const discountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DISCOUNTS':
            return {
                ...state,
                discounts: action.payload.discounts,
                totalDiscount: action.payload.countAllDiscount,
            };

        case 'GET_DETAIL_DISCOUNT':
            return {
                ...state,
                discount: action.payload,
            };
        default:
            return state;
    }
};

export default discountReducer;
