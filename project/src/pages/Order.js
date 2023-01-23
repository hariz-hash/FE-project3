import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import UserContext from '../contexts/UserContext';
import Table from 'react-bootstrap/Table';
export default function Order() {
    const userContext = useContext(UserContext);

    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        (async () => {
            // const valid = await userContext.refreshToken();
            // if(!valid){
            //     return;
            // }
            const orderHistory = await userContext.orders();
            console.log("orders", orderHistory);

            setOrderHistory(orderHistory);
        })();
    }, []);

    return (
        <>
            <div style={{ width: "100", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <h1> Order History</h1>
            </div>            
            <Table striped bordered hover className='m-3'>
                <thead>
                    <tr>
                        <th>Total Cost</th>
                        <th>Payment Type</th>
                        <th>ShippingAddress</th>
                        <th>Order Date</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Receipt</th>
                    </tr>
                </thead>
                <tbody>


                    {orderHistory.length ? orderHistory.map((orderHistory) => {
                        return (
                            <tr key={orderHistory.id}>
                                <td>{(orderHistory.total_amount)}</td>
                                <td>{orderHistory.payment_type}</td>
                                <td>{orderHistory.shipping_address_line1} <br /> {orderHistory.shipping_address_line2} <br /> {orderHistory.shipping_postal_code}</td>
                                <td>{new Date(orderHistory.order_date.slice(0, -1)).toDateString()}</td>
                                <td>{new Date(orderHistory.delivery_date.slice(0, -1)).toDateString()}</td>
                                <td>{orderHistory.status.order_status}</td>
                                <td><a href={orderHistory.receipt_url} target="_blank" className="login-button">Receipt</a></td>
                            </tr>
                        )
                    }) : ''}


                </tbody>
            </Table>

        </>
    )
}

