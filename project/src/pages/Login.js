import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function Login() {

    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    })

    const updateFormFields =(event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    return (
        <React.Fragment>
               <h1>Sign in</h1>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="text"
                    name="email"
                    value={formFields.email}
                    onChange={updateFormFields}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    value={formFields.password}
                    onChange={updateFormFields}
                    />
               
                </Form.Group>


        </React.Fragment>
    )
}