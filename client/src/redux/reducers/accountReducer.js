const initialState = {
    accounts: [],
    account: {},
    totalAccount: 1,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_ACCOUNTS':
            return {
                ...state,
                accounts: action.payload.accounts,
                totalOrder: action.payload.countAllAccount,
            };

        case 'GET_DETAIL_ACCOUNT':
            return {
                ...state,
                account: action.payload,
            };
        default:
            return state;
    }
};

export default accountReducer;
