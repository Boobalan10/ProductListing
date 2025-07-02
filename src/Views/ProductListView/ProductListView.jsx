import { useEffect, useState } from 'react';
import FilterForm from '../../Components/FilterForm/FilterForm';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltersFromURL } from '../../Slices/FilterSlice';
import { fetchProducts } from '../../Slices/ProductSlice';
import { selectFilteredProducts } from '../../Store/Selectors';

function ProductListView() {

    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const [searchParams, setSearchParams] = useSearchParams();
    const products = useSelector(selectFilteredProducts);

    useEffect(() => {
        const filtersFromURL = {
            searchText: searchParams.get('search') || '',
            selectedCategories: searchParams.get('categories')?.split(',') || [],
            priceRange: searchParams.get('price')?.split('-').map(Number) || [0, 1000],
            sortBy: searchParams.get('sort') || 'none'
        };
        dispatch(setFiltersFromURL(filtersFromURL));
    }, []);

    useEffect(() => {
        setSearchParams({
            search: filters.searchText,
            categories: filters.selectedCategories.join(','),
            price: filters.priceRange.join('-'),
            sort: filters.sortBy
        });
    }, [filters]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <section className='container-fluid'>
            <section className='filter-sec mb-5'>
                <FilterForm />
            </section>
            <section className='product-data'>
                <div className='container-fluid'>
                    <div className='row'>
                        {products?.map((item) => (
                            <div className='col-12 col-sm-6 col-md-4 col-xl-3 mb-5' key={item.id}>
                                <ProductCard productData={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default ProductListView
