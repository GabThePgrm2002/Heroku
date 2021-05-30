import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import AOS from 'aos';
import "aos/dist/aos.css";

function DetailProduct() {

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        AOS.init({});
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id,products])

    if(detailProduct.length === 0) return null;

    return (
        
            <div className="container detail">
                <div className="">
                <h2 data-aos="fade-in" className="page-title text-center">Product Details</h2>
                <div className="row  detail-cols p50">
                    <div className="col-lg-6 mt20 mb20">
                    <img data-aos="zoom-in" src={detailProduct.images.url} alt="product image" />
                    </div>
                    <div className="col-lg-6 mt20 mb20">
                        <h1 className="detail-title">{detailProduct.title}</h1>
                        <span className="detail-price">€{detailProduct.price}</span>
                        <p className="detail-description"><b>Description: </b>{detailProduct.description}</p>
                        <p className="detail-category"><b>Content:</b> {detailProduct.content}</p>
                        <p className="detail-sold"><b>Sold:</b> {detailProduct.sold}</p>
                        <Link data-aos="zoom-in" to="/cart" className="cart" onClick={() =>addCart(detailProduct)}>ADD TO CART
                        </Link>
                    </div>
                </div>

                
            </div>
            
        </div>
    )
}

export default DetailProduct
