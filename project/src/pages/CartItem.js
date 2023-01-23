import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CartItem(props) {
    const userContext = useContext(UserContext);

    const [quantity, setQuantity] = useState(1)

    const [errors, setErrors] = useState([]);


    const { getAllCartItems, deletItem, refresh, setRefresh } = props;
    console.log(getAllCartItems)

    const showToastMessageSuccess = (message) => {

        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastMessageFail = (message) => {

        toast.warning(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    // const validateFormFields = async () => {
    //     const errors = [];

    //     if (formFields.password.length < 4 || formFields.password.length > 200) {
    //         errors.push('password');
    //     }

    //     setErrors(errors);
    //     return errors;
    // };

    const [updatedQuantity, setUpdatedQuantity] = useState(1)

    async function updateCartItem(varid, quantity) {
        // alert('yes' + varid + "========" + quantity)

        let response = await userContext.updateCartItem(varid, quantity)
        console.log(response.data.state)
        if (response.data.state == true) {

            setUpdatedQuantity(quantity)
            showToastMessageSuccess("Quantity updated")
            refresh ? setRefresh(false) : setRefresh(true)

        }
        else if (response.data.state == false) {
            showToastMessageFail("Product limit reached")
            refresh ? setRefresh(false) : setRefresh(true)


        }
        // 

    }



    return (<>

        <ToastContainer />


        <Card className="card" key={getAllCartItems.id} >


            <div style={{ display: "flex", "justifyContent": "center" }}><Card.Img className="card-img-top my-3 my-md-3" style={{ width: "fit-content", maxWidth: "25rem", maxHeight: "10rem" }} src={getAllCartItems.variant?.image_url} /></div>

            <Card.Body>
                <Card.Title>   <span style={{ fontSize: "1.5rem" }}> {getAllCartItems.variant?.color?.color} {getAllCartItems.variant?.shoe?.model}</span> <br /> <span className='titleFont'>${(getAllCartItems.variant?.cost) / 100 * getAllCartItems.quantity}</span> <br /> Quantity: {getAllCartItems.quantity}  <br />
                </Card.Title>

                <Form.Label>Edit Quantity:</Form.Label>
                <Form.Control
                    className="form-control form-control-sm"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} />

                <div style={{ width: "100", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <Button className="btn btn-primary" onClick={() => updateCartItem(getAllCartItems.variant_id, quantity)}>Update</Button>
                    <Button className="btn btn-danger " style={{ backgroundColor: "red" }} onClick={() => deletItem(getAllCartItems.variant_id)}>Remove</Button>
                </div>



            </Card.Body>
        </Card>


    </>)



}