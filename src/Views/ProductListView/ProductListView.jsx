import { useEffect, useState, useCallback, useMemo } from 'react';
import FilterForm from '../../Components/FilterForm/FilterForm';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltersFromURL } from '../../Slices/FilterSlice';
import { fetchProducts } from '../../Slices/ProductSlice';
import { selectFilteredProducts } from '../../Store/Selectors';
import { useInView } from 'react-intersection-observer';
import { Assets } from '../../Assets/Assets';

function ProductListView() {

    const dispatch = useDispatch();

    const filters = useSelector(state => state.filters);

    const [searchParams, setSearchParams] = useSearchParams();

    const products = useSelector(selectFilteredProducts);

    const [page, setPage] = useState(0);

    const { ref, inView } = useInView();

    const limit = 10;

    useEffect(() => {
        const filtersFromURL = {
            searchText: searchParams.get('search') || '',
            selectedCategories: searchParams.get('categories')?.split(',') || [],
            priceRange: searchParams.get('price')?.split('-').map(Number) || [0, 999],
            sortBy: searchParams.get('sort') || 'none'
        };
        dispatch(setFiltersFromURL(filtersFromURL));
    }, [searchParams, dispatch]);

    const validateSet = useCallback((filters) => {
        const params = {};
        if (filters.searchText) params.search = filters.searchText;
        if (filters.selectedCategories?.length) params.categories = filters.selectedCategories.join(',');
        if (filters.priceRange && (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 999)) {
            params.price = filters.priceRange.join('-');
        }
        if (filters.sortBy !== 'none') params.sort = filters.sortBy;
        return params;
    }, []);

    const paramData = useMemo(() => validateSet(filters), [filters, validateSet]);

    useEffect(() => {
        setSearchParams(paramData)
    }, [paramData, setSearchParams]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const visibleProducts = useMemo(() => {
        return products.slice(0, page * limit);
    }, [products, page]);

    const flagStop = visibleProducts.length < products.length;

    useEffect(() => {
        if (inView && flagStop) {
            setPage((prev) => prev + 1);
        }
    }, [inView, flagStop]);

    console.log('sliced', visibleProducts)
    console.log('page', page)

    return (
        <section className='product-view mt-4'>
            <section className='filter-sec mb-5 container-fluid'>
                <FilterForm />
            </section>
            <section className='product-data py-4'>
                <div className='container-fluid'>
                    <div className='row'>
                        {visibleProducts?.map((item) => (
                            <div className='col-12 col-sm-6 col-md-4 col-xl-3 mb-5' key={item.id}>
                                <ProductCard productData={item} />
                            </div>
                        ))}
                    </div>
                    <div ref={ref} className='text-center'>{page * limit < products.length ? <img src={Assets.LoadingIcon} alt='loadingIcon' /> : ''}</div>
                </div>
            </section>
        </section>
    )
}

export default ProductListView
