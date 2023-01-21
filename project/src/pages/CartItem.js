import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';



export default function CartItem(props) {
    const userContext = useContext(UserContext);

    const [quantity, setQuantity] = useState(1)

    const { getAllCartItems, deletItem, refresh, setRefresh  } = props;
    console.log(getAllCartItems)
    async function updateCartItem(varid, quantity) {
        alert('yes' + varid + "========" + quantity)
        const variantid = varid
        await userContext.updateCartItem(varid, quantity)
        refresh ? setRefresh(false) : setRefresh(true)
    }
    return (<>

        <Card className="card" key={getAllCartItems.id} >
            <Card.Body>
                <Card.Img className="img-card" src={getAllCartItems.variant?.image_url} style={{ width: "100px" }} />
                <Card.Title style={{ color: "green" }}> {getAllCartItems.variant?.shoe?.model} &nbsp; {getAllCartItems.variant?.shoe?.shoe_type} : {getAllCartItems.variant?.size?.size}, <br /> price {getAllCartItems.variant?.cost
                }  </Card.Title>
                {
                    <Card.Title style={{ color: "green" }}> Quantity: {getAllCartItems.quantity}
                    </Card.Title>
                }
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} />


                <Button className="btn btn-primary mt-3 ml-3" onClick={() => updateCartItem(getAllCartItems.variant_id, quantity)}>Update</Button>
                <br />
                <Button className="btn btn-danger mt-3 ml-3" onClick={() => deletItem(getAllCartItems.variant_id)}>Remove</Button>


            </Card.Body>
        </Card>


    </>)



}