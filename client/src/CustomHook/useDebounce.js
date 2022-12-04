import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
    const [debounce, setDebounce] = useState('');
    useEffect(() => {
        const status = setTimeout(() => {
            setDebounce(value);
        }, delay);
        return () => {
            clearTimeout(status);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debounce;
}

export default useDebounce;
