import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios';
import swal from 'sweetalert';
import PaypalButton from './PaypalButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'



function Cart() {

    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total,setTotal] = useState(0)

    useEffect(() => {

        const getTotal = () => {
            const total = cart.reduce((prev,item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()
    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 10 ? item.quantity = 10 : item.quantity += 1;
            }

        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = (id) => {
        if(swal({
            title: "Message from ArvaZon!",
            text: "Are you sure you want to remove this product from the cart?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                swal({
                title: "Message from ArvaZon!",
                text: "Product successfully removed from the cart!", 
                icon: "success",
              });
              cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
            }
          })){
            

            
        }
    }

    const tranSuccess = async (payment) => {
        console.log(payment);

        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart,paymentID,address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        swal({
            title: "Message from ArvaZon!",
            text: "Order placed successfully!",
            icon: "success",
            button: true,
          })

    }


    /*if(cart.length === 0){
        swal({
            title: "Message from ArvaZon!",
            text: "The cart is empty!",
            icon: "warning",
            button: true,
          })
    }*/

        
    return (

        <div className="container">
                <div className="detail">
                <h2 className="page-title text-center">Shopping Cart</h2>
            {
                 
                cart.map(product => (
                    <div className="row detail-cols p50 mb20" key={product._id}>
                    <div className="col-lg-6 mt20 mb20">
                    <img src={product.images.url} alt="" />
                    </div>
                    <div className="col-lg-6 mt20 mb20">
                        <h1 className="detail-title">{product.title}</h1>
                        <h3 className="detail-price">€{product.price * product.quantity}</h3>
                        <p className="detail-description"><b>Description: </b>{product.description}</p>
                        <p className="detail-category"><b>Content:</b> {product.content}</p>
                        <div className="amount">
                            <button onClick={() => decrement(product._id)}><FontAwesomeIcon icon={faMinus} /></button>
                            <span>{product.quantity}</span>
                            <button onClick={() => increment(product._id)}><FontAwesomeIcon icon={faPlus} /></button>
                            <button className="delete" onClick={() => removeProduct(product._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>

                    </div>
                </div>
                ))
                
            }


     <div className="total p50 mb20">
    <h3 className="price-total">Total: €{total}</h3>
     {
       total === 0 ? <h3 className="title-green-shadow">Cart is empty!</h3> : <PaypalButton total={total} tranSuccess={tranSuccess} />
     }
</div>


        
        </div>
        </div>
    )
}

export default Cart
