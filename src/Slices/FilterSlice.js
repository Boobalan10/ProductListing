import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: '',
    selectedCategories: [],
    priceRange: [0, 999],
    sortBy: 'none'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        toggleCategory: (state, action) => {
            const cat = action.payload;
            state.selectedCategories.includes(cat)
                ? state.selectedCategories = state.selectedCategories.filter(c => c !== cat)
                : state.selectedCategories.push(cat);
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setReset: () => {
            return initialState;
        },
        setFiltersFromURL: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setSearchText, toggleCategory, setPriceRange, setSortBy, setReset, setFiltersFromURL } = filtersSlice.actions;
export default filtersSlice.reducer;