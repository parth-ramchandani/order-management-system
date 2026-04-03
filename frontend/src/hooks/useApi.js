import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callWithState = useCallback(async (action) => {
        setLoading(true);
        setError(null);
        try {
            const res = await action();
            return res.data;
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong';
            setError(msg);
            throw msg;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, call: callWithState, setError };
};

export default useApi;
