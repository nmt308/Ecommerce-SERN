const initialState = {
    orders: [],
    order: {},
    totalOrder: 1,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_ORDERS':
            return {
                ...state,
                orders: action.payload.orders,
                totalOrder: action.payload.countAllOrder,
            };

        case 'GET_DETAIL_ORDER':
            return {
                ...state,
                order: action.payload,
            };
        default:
            return state;
    }
};

export default orderReducer;
