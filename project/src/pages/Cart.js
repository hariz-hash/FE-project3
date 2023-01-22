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
        // alert('yes' + varid + "========" + quantity)
        const variantid = varid
        let data = await userContext.updateCartItem(varid, quantity)

        if (data.state = true) {
            alert("Quantity Updated")
        }
        else if (data.state = false) {
            alert("Item reach it's limit Updated")

        }
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


                <div className="container-fluid">
                    {getAllCartItems?.length > 0 ? (
                        <div> <Button className="btn btn-primary mt-3 ml-3" onClick={handleCheckout}>Checkout</Button>

                            {getAllCartItems.map((getAllCartItems) => {
                                return (

                                    <CartItem getAllCartItems={getAllCartItems} deletItem={deletItem} refresh={refresh} setRefresh={setRefresh} />

                                );
                            })
                            }

                        </div>

                    ) : <div>
                        <h5>No shoes found</h5>
                    </div>}

                    {/* NO SHOE FOUND PROMPT */}
                </div>

            </div>

        </>
    )
}