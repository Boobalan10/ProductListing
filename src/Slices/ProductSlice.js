import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data'); // Demo API
    return await res.json();
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