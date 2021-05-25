import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

function OrderHistory() {

    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token



    useEffect(() =>{
        if(token){
            const getHistory = async () => {
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                   setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                   setHistory(res.data)
                }
            }
            getHistory()
        }
    }, [token, isAdmin, setHistory])

    return (
        <>
            <h2 className="text-center m150 page-title">Orders History</h2>
        <div className="history-page container">
            <h2 className="mt20">You have {history.length} orders</h2>

            <div className="container text-center">
                <table className="text-center">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of Purchase</th>
                            <th>View Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                history.map(items =>(
                                    <tr key={items._id}>
                                        <td>{items.paymentID}</td>
                                        <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                        <td className="td-btn">
                                            <Link className="table-link" to={`/history/${items._id}`}><FontAwesomeIcon icon={faInfo} /> Details</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default OrderHistory
