import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos';
import "aos/dist/aos.css";

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    useEffect(() => {
        AOS.init({duration: 750})
    })

    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart

    return (
        <div data-aos="zoom-in" className="col-lg-4 col-md-6 col-sm-12">
            <div className="product-card">
                {
                    isAdmin && <input type="checkbox" checked={product.checked} onChange={() => handleCheck(product._id)} />
                }
                <img src={product.images.url} alt="" />
                <div className="product-box">
                    <h2 title={product.title}>{product.title}</h2>
                    <span className="price"><b>€{product.price}</b></span>
                </div>
                <div className="row_btn">
                    {
                        isAdmin ? 
                        <React.Fragment>
                        <Link id="btn_view" to="#!">
                        <FontAwesomeIcon icon={faTrashAlt}  size="2x" onClick={() => deleteProduct(product._id, product.images.public_id)} />
                    </Link>
                    <Link id="btn_buy" to={`/edit_product/${product._id}`}>
                        <FontAwesomeIcon icon={faEdit}  size="2x" />
                    </Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <Link id="btn_buy" to="/cart" onClick={ () => addCart(product) }>
                        <FontAwesomeIcon icon={faShoppingCart}  size="2x" /> 
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        <FontAwesomeIcon icon={faInfoCircle}  size="2x" /> 
                    </Link>
                        </React.Fragment>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default ProductItem
