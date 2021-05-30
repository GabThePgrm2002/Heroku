import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState';
import AOS from 'aos';
import "aos/dist/aos.css";

function Filters() {

    useEffect(() => {
        AOS.init({duration: 750})
    })

    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    const handleSearch = e => {
        setSearch(e.target.value.toLowerCase())
    }

    return (
        <React.Fragment>
        <div data-aos="fade-up" className="filter-menu row">
            <div className="col-lg-3 filter-col">
            <p>Filters:</p>
            <select name="category" value={category} onChange={handleCategory}>
                <option value=''>All Products</option>
                {
                    categories.map(category => (
                        <option key={category._id} value={"category="+category._id}>{category.name}</option>
                    ))
                }
            </select>
            </div>

            <div className="col-lg-6 input-col filter-col">
            <p>Search:</p>
                <input type="text" value={search} placeholder="Search for a product..." onChange={handleSearch} />
            </div>


            <div className="col-lg-3 filter-col">
            <p>Sort By:</p>
            <select name="sort" value={sort} onChange={e => setSort(e.target.value)}>
                <option value=''>Newest</option>
                <option value='sort=oldest'>Oldest</option>
                <option value='sort=-sold'>Best Sales</option>
                <option value='sort=-price'>Price: High - Low</option>
                <option value='sort=price'>Price: Low - High</option>
            </select>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Filters
