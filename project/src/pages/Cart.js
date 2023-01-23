import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import CartItem from './CartItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Cart(props) {
    const userContext = useContext(UserContext);
    let navigate = useNavigate();
    // const variantId = props.cartItem.variant_id;
    // const getAllCartItems = userContext.getAllCart() || [];


    const showToastMessageSuccess = (message) => {

        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

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
        showToastMessageSuccess("Item Removed from cart!")
        await userContext.deleteCartItem(varid)

        refresh ? setRefresh(false) : setRefresh(true)
    }

    // async function updateCartItem(varid, quantity) {
    //     // alert('yes' + varid + "========" + quantity)
    //     const variantid = varid
    //     let data = await userContext.updateCartItem(varid, quantity)

    //     if (data.state = true) {
    //         alert("Quantity Updated")
    //     }
    //     else if (data.state = false) {
    //         alert("Item reach it's limit Updated")

    //     }
    // }

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


            <ToastContainer />

            <div className="container-fluid">
                <div style={{ width: "100", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                    <h1> Your Cart</h1>
                </div>


                {getAllCartItems?.length > 0 ? (
                    <div>
                        <div class="row row-cols-md-3">

                            {
                                getAllCartItems.map((getAllCartItems) => {
                                    return (
                                        <div class="col gy-3">

                                            <CartItem getAllCartItems={getAllCartItems} deletItem={deletItem} refresh={refresh} setRefresh={setRefresh} />
                                        </div>

                                    );
                                })
                            }
                        </div>
                        < div style={{ width: "100", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                            <Button className="btn btn-primary" onClick={handleCheckout}>Checkout</Button>
                        </div>
                    </div>

                ) : <div>
                    <div style={{ width: "100", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                        <h5>No shoes found</h5>
                    </div>
                </div>}

                {/* NO SHOE FOUND PROMPT */}
            </div>


        </>
    )
}