import { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import style from '../../Assets/Css/FilterForm.module.css';
import RangeSlider from "react-range-slider-input";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, toggleCategory, setPriceRange, setSortBy, setReset } from '../../Slices/FilterSlice';

function FilterForm() {

    const checkBoxValue = ['Paid', 'Free', 'View Only'];

    const [rangeValue, setRangeValue] = useState([0, 999]);

    const filters = useSelector(state => state.filters);

    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(setReset())
    }

    return (
        <form>
            <div className={`${style.searchSec} mb-4`}>
                <div className='search-box col-12 col-sm-10 col-lg-8 mx-auto px-0'>
                    <input type="text" className="border-0 w-100" placeholder="search" name='search'
                        value={filters.searchText}
                        onChange={(e) => dispatch(setSearchText(e.target.value))}
                    />
                    <img src={Assets.SearchIcon} alt="search-icon" />
                </div>
            </div>
            <div className={`${style.filterBox} row justify-content-between mx-0 py-2`}>
                <div className='col-12 col-md-10 col-xl-11'>
                    <div className='row align-items-center mx-0'>
                        <div className='checkbox-sec col-12 col-md-6 col-xl-4 px-0 mb-2'>
                            <label className='mr-3'> Pricing Option</label>
                            {checkBoxValue.map((item) => (
                                <div className="form-check form-check-inline" key={item}>
                                    <input className="form-check-input" type="checkbox" value={item}
                                        checked={filters.selectedCategories.includes(item)}
                                        onChange={() => dispatch(toggleCategory(item))}
                                    />
                                    <label className="form-check-label">{item}</label>
                                </div>
                            ))}
                        </div>
                        <div className='range-slide-sec col-12 col-md-6 col-xl-4 px-0 mb-2'>
                            <label className='mr-3'>Price Filter</label>
                            <div className={`${style.slideValue} d-flex mt-2 align-items-center`}>
                                <input type="number" value={rangeValue[0]} readOnly />
                                <RangeSlider value={rangeValue} min={0} max={999}
                                    disabled={!filters.selectedCategories.includes('Paid')}
                                    onInput={(e) => {
                                        setRangeValue(e);
                                        dispatch(setPriceRange(e));
                                    }} />
                                <input type="number" value={rangeValue[1]} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
                <button className='bg-transparent border-0 col-12 col-md-2 col-xl-1' onClick={handleClick}><img src={Assets.ResetIcon} alt="resetIcon" />Reset</button>
            </div>
            <div className='sort-sec mt-4 text-right'>
                <span>SortBy</span>
                <select value={filters.sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
                    <option value="none">Sort</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </div>
        </form>
    )
}

export default FilterForm
