import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"

import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
export default function Cart(props) {
    const userContext = useContext(UserContext);
    // const variantId = props.cartItem.variant_id;
    // const getAllCartItems = userContext.getAllCart() || [];

    const { variant_id } = useParams();
    const [update, setUpdate] = useState(false);
    let [refresh,setRefresh] = useState(false);
    // const [quantity, setQuantity] = useState(props.cartItem.quantity);
    const [error, setError] = useState(false);
    const [getAllCartItems, setGetAllCartItems] = useState(null)


    useEffect(() => {
        (async () => {
            let cart = await userContext.getCart();
            console.log(cart);
            setGetAllCartItems(cart)

        })();
    }, [refresh]);


    async function deletItem(varid) {
        // alert('yes' + varid)
        // const variantid = varid
        await userContext.deleteCartItem(varid)
        
        refresh?setRefresh(false):setRefresh (true)
    }

    //   async function updateCartItem(varid) {
    //     alert('yes' + varid)
    //     const variantid = varid
    //         // await userContext.updateCartItem(varid)
    //   }




    // const updateFormFields = (event) => {
    //     let availableStock = props.cartItem.variant.stock;
    //     let userQuantity = parseInt(event.target.value);


    //     if (userQuantity > availableStock) {
    //         // setQuantity(availableStock)
    //         setError(true);
    //     }
    //     else if (userQuantity < 1) {
    //         // setQuantity(1)
    //         setError(true);
    //     }
    //     else {
    //         // setQuantity(event.target.value)
    //     }
    // }

    return (
        <>
            <div className="tabs">

                <div className="container-fluid">
                    {getAllCartItems ? (
                        getAllCartItems.map((getAllCartItems) => {
                            return (

                                <Card className="card" key={getAllCartItems.id} >
                                    <Card.Body>
                                        {/* <Card.Img className="img-card w-50 h-25" src={shoe.image_url} /> */}
                                        <Card.Img className="img-card" src={getAllCartItems.variant?.image_url} style={{ width: "100px" }} />
                                        {/* { addCart(variant.id)} */}
                                        <Card.Title style={{ color: "green" }}> {getAllCartItems.variant?.shoe?.model} &nbsp; {getAllCartItems.variant?.shoe?.shoe_type} : {getAllCartItems.variant?.size?.size}, <br /> price {getAllCartItems.variant?.cost
                                        }  </Card.Title>
                                        {
                                            <Card.Title style={{ color: "green" }}> Quantity: {getAllCartItems.quantity}
                                            </Card.Title>
                                        }
                                        {/* <Form.Control className="quantity-cart-form"
                                            type="number"
                                            name="quantity"
                                            value={quantity}
                                            onChange={updateFormFields}
                                            min={1}
                                        /> */}

                                        <Button className="btn btn-primary mt-3 ml-3"  >Update</Button>
                                        <br />
                                        <Button className="btn btn-danger mt-3 ml-3" onClick={() => deletItem(getAllCartItems.variant_id)}>Remove</Button>


                                    </Card.Body>
                                </Card>
                            );
                        })
                    ) : <div>
                        <h5>No shoes found</h5>
                    </div>}


                </div>

            </div>

        </>
    )
}