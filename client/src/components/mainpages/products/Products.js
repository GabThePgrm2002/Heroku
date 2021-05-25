import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem';
import Shopping from './shopping.svg'
import swal from 'sweetalert';
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'

function Products() {

    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [isCheck, setIsCheck] = useState(false)

    const deleteProduct = async (id, public_id) => {
        try {
            const destroyImg = await axios.post('/api/destroy', {public_id}, { 
                headers: {Authorization: token}
            })
            const deleteProduct = await axios.delete(`/api/products/${id}`, { 
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            swal({
                title: "Message from ArvaZon!",
                text: "Product deleted successfully!!", 
                icon: "success",
                button: true
              })
            setCallback(!callback)

        } catch (err) {
            swal({
                title: "Message from ArvaZon!",
                text: err.response.data.msg, 
                icon: "warning",
                button: true
              }) 
        }
    }

    const handleCheck = (id) => {
        /*let newProduct = [...product];
        newProduct.checked = !newProduct.checked;
        setProducts(newProduct);*/
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked;
        })
        setProducts([...products]);
    }

    const checkAll = () =>{
        products.forEach(product =>{
            product.checked = !isCheck;
            setProducts([...products]);
            setIsCheck(!isCheck);
        })
    }

    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    return (
        <>
        <div className="container landing">
            <img className="landing-img" src={Shopping} />
            
        </div>
        <div className="products">
            <h1 className="page-title">Products Catalog</h1>
            <div className="container text-center">

                {
                    isAdmin &&
                    <div className="delete-all">
                        <div className="check-div">
                        <span>Select all&nbsp;&nbsp;</span>
                        <input type="checkbox" id="check-all" checked={isCheck} onChange={checkAll} />
                        </div>
                        <button className="form_btn" onClick={deleteAll}>Delete ALL</button>
                    </div>
                }

                <Filters />

                <div className="row">
                {
               products.map(product => {
                   return <ProductItem key={product._id} product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
               })
           }
                </div>
                <LoadMore />
            </div> 

        </div>
        </>
    )
}

export default Products
