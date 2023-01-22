import React, { useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../contexts/UserContext';
import { toast } from 'react-toastify';
export default function SignUp() {

    const [errors, setErrors] = useState([]);
    const userContext = useContext(UserContext);

    const [formFields, setFormFields] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const updateFormFields = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };
    const validateFormFields = async () => {
        const errors = [];


        if (
            formFields.username.length < 4 || formFields.username.length > 200) {
            errors.push('username');
        }

        if (!formFields.email.includes("@") || !formFields.email.includes(".")) {
            errors.push('email');
        }

        if (formFields.password.length < 4 || formFields.password.length > 200) {
            errors.push('password');
        }

        if (formFields.confirm_password !== formFields.password) {
            errors.push('confirm_password');
        }

        setErrors(errors);
        return errors;
    };
    const register = async function () {
        const errors = await validateFormFields();
        if (errors.length) {
            return;
        }
        const userData = {
            username: formFields.username,
            email: formFields.email,
            password: formFields.password,
        };

        await userContext.register(userData);
    };

    return (
        <>
            <Form.Group>
                <Form.Label>User</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formFields.username}
                    onChange={updateFormFields} />
                {errors.includes('username') ? (
                    <Form.Text className='error'>
                        Username needs to be between 4 to 200 characters
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    value={formFields.email}
                    onChange={updateFormFields} />
                {errors.includes('email') ? (
                    <Form.Text className='error'>
                        Enter a valid email
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formFields.password}
                    onChange={updateFormFields}
                />
                {errors.includes('password') ? (
                    <Form.Text className='error'>
                        Password needs to be between 4 to 200 characters
                    </Form.Text>
                ) : ('')}

            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    name="confirm_password"
                    value={formFields.confirm_password}
                    onChange={updateFormFields}
                />
                {errors.includes('confirm_password') ? (
                    <Form.Text className='error'>
                        Password does not match. Type again.
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Button variant='primary' onClick={register}>
                Register
            </Button>
        </>
    )
}