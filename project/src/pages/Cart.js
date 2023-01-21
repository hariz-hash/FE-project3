import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import CartItem from './CartItem';
export default function Cart(props) {
    const userContext = useContext(UserContext);
    let navigate = useNavigate();
    // const variantId = props.cartItem.variant_id;
    // const getAllCartItems = userContext.getAllCart() || [];

    const { variant_id } = useParams();
    const [update, setUpdate] = useState(false);
    let [refresh, setRefresh] = useState(false);
    // const [quantity, setQuantity] = useState(props.cartItem.quantity);
    const [error, setError] = useState(false);
    const [getAllCartItems, setGetAllCartItems] = useState(null)
    const [quantityFromDb, setQuantityFromDb] = useState('')

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

        refresh ? setRefresh(false) : setRefresh(true)
    }

    async function updateCartItem(varid, quantity) {
        alert('yes' + varid + "========" + quantity)
        const variantid = varid
        await userContext.updateCartItem(varid,quantity)
    }

    async function handleCheckout() {
        // alert('yes' + varid + "========" + quantity)
        // const variantid = varid
        // await userContext.updateCartItem(varid,quantity)
        const checkout = await userContext.checkout(getAllCartItems);
        // navigate(checkout.stripe_url)
        window.location.href = checkout.stripe_url


    }


    return (
        <>
            <div className="tabs">
            <Button className="btn btn-primary mt-3 ml-3" onClick={handleCheckout}>Checkout</Button>

                <div className="container-fluid">
                    {getAllCartItems ? (
                        getAllCartItems.map((getAllCartItems) => {
                            return (

                                
                                // <Card className="card" key={getAllCartItems.id} >
                                //     <Card.Body>
                                //         <Card.Img className="img-card" src={getAllCartItems.variant?.image_url} style={{ width: "100px" }} />
                                //         <Card.Title style={{ color: "green" }}> {getAllCartItems.variant?.shoe?.model} &nbsp; {getAllCartItems.variant?.shoe?.shoe_type} : {getAllCartItems.variant?.size?.size}, <br /> price {getAllCartItems.variant?.cost
                                //         }  </Card.Title>
                                //         {
                                //             <Card.Title style={{ color: "green" }}> Quantity: {getAllCartItems.quantity}
                                //             </Card.Title>
                                //         }
                                //         <Form.Label>Quantity</Form.Label>
                                //         <Form.Control
                                //             className="form-control form-control-sm"
                                //             type="text"
                                //             name="quantity"
                                //             value={quantity}
                                //             onChange={(e) => setQuantity(e.target.value)} />


                                //         <Button className="btn btn-primary mt-3 ml-3" onClick={() => updateCartItem(getAllCartItems.variant_id, quantity)}>Update</Button>
                                //         <br />
                                //         <Button className="btn btn-danger mt-3 ml-3" onClick={() => deletItem(getAllCartItems.variant_id)}>Remove</Button>


                                //     </Card.Body>
                                // </Card>
                                // <CartItem />
                            <CartItem getAllCartItems={getAllCartItems} deletItem={deletItem} refresh={refresh} setRefresh={setRefresh}/>
                            );
                        })
                    ) : <div>
                        <h5>No shoes found</h5>
                    </div>}

                    {/* NO SHOE FOUND PROMPT */}
                </div>

            </div>

        </>
    )
}