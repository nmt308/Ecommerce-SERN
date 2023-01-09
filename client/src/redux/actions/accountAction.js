import axios from 'axios';

export const getAccounts = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/api/accounts', {
            params: {
                page: currentPage,
            },
        });

        const accounts = res.data.accounts;
        const countAllAccount = res.data.countAllAccount; // All accounts without limit to set pageCount
        dispatch({
            type: 'GET_ALL_ACCOUNTS',
            payload: { accounts, countAllAccount },
        });
    };
};

export const updateAccount = (id, status, page) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:8080/api/Account/edit/${id}`, {
            status,
        });
        if (res.status === 200) {
            dispatch(getAccounts(page));
            return {
                type: 'success',
                message: res.data.message,
            };
        } else {
            return {
                type: 'error',
                message: res.data.message,
            };
        }
    };
};

export const searchAccount = (email, currentPage) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/Account/search`, {
            params: {
                email: email,
                page: currentPage,
            },
        });
        return {
            result: res.data.result,
        };
    };
};
