import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        orders: orderReducer,
    },
});
