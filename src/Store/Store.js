import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../Slices/ProductSlice';
import filtersReducer from '../Slices/FilterSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filters: filtersReducer
    }
});