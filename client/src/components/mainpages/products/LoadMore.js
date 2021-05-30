import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import AOS from 'aos';
import "aos/dist/aos.css";

function LoadMore() {

    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    useEffect(() => {
        AOS.init({duration: 750})
    })

    return (
        <div className="load-more">
            {
            result < page * 9 ? "" : 
            <button data-aos="zoom-in" className="form_btn m100" onClick={() => setPage(page+1)}>Load More</button>
            }
        </div>
    )
}

export default LoadMore
