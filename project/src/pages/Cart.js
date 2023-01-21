import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"

import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
export default function Cart()
{
    const userContext = useContext(UserContext);

    const { variant_id } = useParams();
    const shoeContext = useContext(ShoeContext);
    // const variant = shoeContext.getAllVariant() || [];
    const variantOnly = shoeContext.getVariantOnly() || [];
    //  console.log(typeof variantOnly)

    const [shoe, setShoe] = useState({});

 
    useEffect(() => {
        (async () => {
            await shoeContext.getVariantByIdOnly(variant_id);

        })();
    }, [variant_id]);

    const addCart = async () => {
        console.log(variantOnly.id);
        await userContext.addToCart(variantOnly.id)
    }

    return (
        <>
            <h1>{variantOnly.id}</h1>
            <Button className="btn btn-primary mt-3 ml-3" as={Link} onClick={addCart}>View Collection</Button>
        </>
    )
}