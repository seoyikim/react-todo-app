import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TOAST_DURATION = 1000;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = uuidv4();
        setToasts(prev => [...prev, { id, message, isVisible: true, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, TOAST_DURATION);
    }, []);

    return { toasts, showToast };
};
