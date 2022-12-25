import axios from 'axios';
export const userLogin = (email) => {
    return (dispatch) => {
        dispatch({
            type: 'LOGIN_USER',
            payload: email,
        });
    };
};
