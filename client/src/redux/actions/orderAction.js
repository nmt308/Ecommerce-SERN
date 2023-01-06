import axios from 'axios';

export const getOrders = (currentPage) => {
    // Thunk action creator return 1 thunk action (1 action trả về 1 function)
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/api/orders', {
            params: {
                page: currentPage,
            },
        });

        const orders = res.data.orders;
        const countAllOrder = res.data.countAllOrder; // All orders without limit to set pageCount
        dispatch({
            type: 'GET_ALL_ORDERS',
            payload: { orders, countAllOrder },
        });
    };
};

// export const getDetailOrder = (id) => {
//     // Thunk action creator return 1 thunk action (1 action trả về 1 function)
//     return async (dispatch) => {
//         const res = await axios.get(`http://localhost:8080/api/Order/detail/${id}`);
//         const Order = res.data.Order;
//         dispatch({
//             type: 'GET_DETAIL_ORDER',
//             payload: Order,
//         });
//         return Order;
//     };
// };

export const updateOrder = (id, status, page) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:8080/api/Order/edit/${id}`, {
            status,
        });
        if (res.status === 200) {
            dispatch(getOrders(page));
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

export const searchOrder = (searchID, currentPage) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:8080/api/Order/search`, {
            params: {
                order_id: searchID,
                page: currentPage,
            },
        });
        return {
            result: res.data.result,
        };
    };
};
