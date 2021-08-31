import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getOrder } from '../../api/orders';

const OrderDetails = () => {
    const [order, SetOrder] = useState(null);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getOrder(params.id)
                .then((res) => SetOrder(res.data))
                .catch(err => console.log(err))
        }
    }, [params.id])

    if (order === null) return null;

    return (
        <div className="history-page">
            <br />
            <br />
            <br />
            <br />
            <h2 >Order Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{order.name}</td>
                        <td>{order.address.street + " - " + order.address.city}</td>
                        <td>{order.address.Zip_code}</td>
                        <td>{order.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.cart.map(item => (
                            <tr key={item.id}>
                                <td><img src={item.media.source} alt="" /></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>$ {item.price.raw * item.quantity}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails;