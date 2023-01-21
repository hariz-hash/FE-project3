import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import UserContext from '../contexts/UserContext';

import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';



export default function VariantList(props) {


    const { product_id } = useParams();
    // console.log(product_id)
    const shoeContext = useContext(ShoeContext);
    const getShoeVariant = shoeContext.getShoeVariant() || [];
    const variantByShoeId = shoeContext.getAllShoe() || [];
    const variantByIdOnly = shoeContext.getVariantOnly() || [];
    const userContext = useContext(UserContext);

console.log({getShoeVariant} )
    // // const variant = shoeContext.getAllVariant() || [];
    // const shoeVariant = shoeContext.getShoeVariant() || [];

    // const [shoe, setShoe] = useState({});

    // //USE EFFECT
    useEffect(() => {
        (async () => {
            await shoeContext.getVariantByShoeId(product_id);
           

        })();
    }, [product_id]);

    // // useEffect(() => {
    // //     (async () => {
    // //         await shoeContext.getShoeById(product_id);

    // //     })();
    // // }, [product_id]);

    //   async function addCart(varid) {
    //     alert('yes' + varid)
    //         await userContext.addToCart(varid)
    //   }
 
    return (<>
      
       <div className="tabs">
      
            <div className="container-fluid">
            {getShoeVariant.length ? (
                    getShoeVariant.map((getShoeVariant) => {
                        return (

                            <Card className="card" key={getShoeVariant.id} >
                                <Card.Body>
                                    {/* <Card.Img className="img-card w-50 h-25" src={shoe.image_url} /> */}
                                    <Card.Img className="img-card" src={getShoeVariant.image_url} style={{ width: "100px" }} />
                                    {/* { addCart(variant.id)} */}
                                    <Card.Title style={{ color: "yellow" }}> {getShoeVariant.model},{getShoeVariant.brand.brand}</Card.Title>
                                    {
                                        userContext.checkIfAuthenticated() ? ( //cart/1/add
                                            <Button className="btn btn-primary mt-3 ml-3" as={Link}  >add cart</Button>
                                            // <Button className="btn btn-primary mt-3 ml-3" as={Link}>Login to add cart</Button>

                                        ) : (
                                            <Button className="btn btn-primary mt-3 ml-3" as={Link} >Login to add cart</Button>
                                            // <Button className="btn btn-primary mt-3 ml-3" as={Link} >add cart</Button>

                                        )
                                    }


                                    {/* <Button className="btn btn-primary mt-3 ml-3" as={Link} to={`/product/${shoe.id}/shoeDetails`}>View Collection</Button> */}

                                </Card.Body>
                            </Card>
                        );
                    })
                ) : <div>
                    <h5>No shoes found</h5>
                </div>}

             
            </div>

        </div> 


    </>)
}