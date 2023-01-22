import React, { useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../contexts/UserContext';
import { toast } from 'react-toastify';
export default function Login() {

    const [errors, setErrors] = useState([]);
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
            alert("Please input valid credentials");

        }else{
            const result = await userContext.login(formFields);
            if (!result) {
                setErrors(['error']);
            }
            else {
                alert('Welcome back');
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
            <h1>Sign in</h1>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    value={formFields.email}
                    onChange={updateFormFields} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formFields.password}
                    onChange={updateFormFields}
                />
                {errors.includes('error') ? (
                    <Form.Text className='error'>
                        Invalid username and/or password
                    </Form.Text>
                ) : (
                    ''
                )}
            </Form.Group>

            <div className='d-flex justify-content-center mt-3 mt-md-4'>
                {/* Login Button */}
                <Button variant='primary' onClick={login}>
                    Login
                </Button>
            </div>

        </React.Fragment>
    )
}