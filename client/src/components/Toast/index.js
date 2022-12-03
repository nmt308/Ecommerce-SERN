import { toast } from 'react-toastify';

const notify = (type, message) => {
    let toastMsg;
    if (type === 'success') {
        toastMsg = message;
    } else if (type === 'error') {
        toastMsg = message;
    }
    toast[type](toastMsg, {
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
