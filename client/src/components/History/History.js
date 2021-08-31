import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getOrders } from '../../api/orders';
import './history.css';

const History = () => {

    const [order, SetOrder] = useState([]);

    useEffect(() => {
        getOrders()
            .then((res) => SetOrder(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="history-page">
            <br />
            <br />
            <br />
            <h2>History</h2>
            <h4>You have {order.length} ordered</h4>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.map(items => (
                            <tr key={items._id}>
                                <td>{items.OrderID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default History;