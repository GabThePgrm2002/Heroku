import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import AOS from 'aos';
import "aos/dist/aos.css";

function OrderDetails() {

    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() =>{
        AOS.init({});
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])

    console.log(orderDetails)

    if(orderDetails.length === 0) return null

    return (
        <React.Fragment>
        <h2 className="text-center m150 page-title">Order Details</h2>
        <div data-aos="zoom-in" className="order-details-page container">
            <div className="container text-center">
                <h2 className="title-green-shadow">Shipping Info</h2>
                <table className="text-center">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Postal Code</th>
                            <th>Country Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderDetails.address.recipient_name}</td>
                            <td>{orderDetails.address.line1 + "-" +orderDetails.address.city}</td>
                            <td>{orderDetails.address.postal_code}</td>
                            <td>{orderDetails.address.country_code}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container text-center m100">
                <h2 className="title-green-shadow">Products Ordered</h2>
                <table className="text-center">
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                orderDetails.cart.map(items =>(
                                    <tr key={items._id}>
                                        <td><img className="img-order" src={items.images.url} /></td>
                                        <td>{items.title}</td>
                                        <td>€{items.price}</td>
                                        <td>{items.quantity}</td>
                                    </tr>
                                ))
                            }
                        
                    </tbody>
                </table>
            </div>
        </div>
        </React.Fragment>
    )
}

export default OrderDetails
