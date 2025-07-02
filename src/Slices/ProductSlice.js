import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const res = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data');
        const data = await res.data;
        return data
    } catch (err) {
        console.log('API Error', err);
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export default productsSlice.reducer;