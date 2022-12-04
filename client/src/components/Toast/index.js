import { toast } from 'react-toastify';

const notify = (type, message) => {
    toast[type](message, {
        toastId: type,
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
    });
};

export default notify;
