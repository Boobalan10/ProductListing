import { createSelector } from '@reduxjs/toolkit';

const categoryLabelToOption = {
    'Paid': 0,
    'Free': 1,
    'View Only': 2,
};

export const selectFilteredProducts = createSelector(
    [(state) => state.products, (state) => state.filters],
    (products, filters) => {
        let filtered = [...products];

        // Search filter
        if (filters.searchText) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(filters.searchText.toLowerCase())
            );
        }

        // Pricing Option (category) filter
        if (filters.selectedCategories.length > 0) {
            const selectedOptions = filters.selectedCategories.map(label => categoryLabelToOption[label]);
            filtered = filtered.filter(p => selectedOptions.includes(p.pricingOption));
        }

        // Price range filter
        const [min, max] = filters.priceRange;
        filtered = filtered.filter(p => p.price >= min && p.price <= max);

        // Sort filter
        if (filters.sortBy === 'lowToHigh') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'highToLow') {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    }
);
