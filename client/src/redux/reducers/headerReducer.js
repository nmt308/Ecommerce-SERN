const initialState = {
    user: '',
    cartNumber: '',
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload.email,
            };

        default:
            return state;
    }
};
export default headerReducer;
