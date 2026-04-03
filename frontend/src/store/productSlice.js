import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        addProduct: (state, action) => {
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

export const { setProducts, addProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
