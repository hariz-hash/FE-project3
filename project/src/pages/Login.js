import React, { useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
    const showToastMessageFail = (message) => {

        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastMessageSucces = (message) => {

        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
   

    const userContext = useContext(UserContext);

    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    })

    const updateFormFields = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    const login = async () => {
        if(formFields.email ==='' || formFields.password === '')
        {
            
            showToastMessageFail("Please input valid credentials")

        }else{
            const result = await userContext.login(formFields);
            if (result==false) {
                showToastMessageFail("Login Fail")
            } else {
                showToastMessageSucces("Welcome!")
            }
            
        }
     
    };
   

    // const validateFormFields = async () => {
    //     const errors = [];


    //     if (!formFields.email.includes("@") || !formFields.email.includes(".")) {
    //         errors.push('email');
    //     }

    //     if (formFields.password.length < 4 || formFields.password.length > 200) {
    //         errors.push('password');
    //     }

    //     if (formFields.confirm_password !== formFields.password) {
    //         errors.push('confirm_password');
    //     }

    //     setErrors(errors);
    //     return errors;
    // };
    



    return (
        <React.Fragment>
             <div style={{ width: "100", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                    <h1> Log In </h1>
                </div>
            <ToastContainer />
            <div className="container-fluid background">

            <Form.Group className='m-4'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    value={formFields.email}
                    onChange={updateFormFields} />
            </Form.Group>
            <Form.Group className='m-4'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formFields.password}
                    onChange={updateFormFields}
                />
             
            </Form.Group>

            <div className='d-flex justify-content-center mt-3 mt-md-4'>
                {/* Login Button */}
                <Button variant='primary' onClick={login}>
                    Login
                </Button>
            </div>


            </div>
           
        </React.Fragment>
    )
}