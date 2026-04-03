import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        addOrder: (state, action) => {
            state.items.unshift(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { setOrders, addOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
