import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSuccess() {

    const navigateTo = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigateTo("/");
        }, 3000);
    }, []);

    return (
        <React.Fragment>

            <div className="container d-flex justify-content-center my-3">
                <h2>Thank you for shopping with us. Please wait...</h2> 
            </div>
        </React.Fragment>
    )
}
