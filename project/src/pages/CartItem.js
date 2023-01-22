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

    async function updateCartItem(varid, quantity) {
        // alert('yes' + varid + "========" + quantity)

        let response = await userContext.updateCartItem(varid, quantity)
        console.log(response.data.state)
        if (response.data.state == true) {

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
                    type="number"
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