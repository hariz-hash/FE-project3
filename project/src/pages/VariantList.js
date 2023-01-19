import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import VariantList from '../pages/VariantList';
import Card from 'react-bootstrap/Card';
import { Link,useParams } from 'react-router-dom';



export default function Product(props) {


    const {product_id} = useParams();
    // console.log(product_id)
    const shoeContext = useContext(ShoeContext);
    const variant = shoeContext.getAllVariant() || [];

    const [shoe, setShoe] = useState({});
   
//USE EFFECT
useEffect(() => {
    (async () => {
        await shoeContext.getVariantByShoeId(product_id);
        
    })();
}, [product_id]);




   return(<>
                 <div className="tabs">
                <div className="container-fluid">
                    {variant.length ? (
                        variant.map((variant) => {
                            return (
                                    
                                    <Card className="card" key={variant.id} >
                                        <Card.Body>
                                        {/* <Card.Img className="img-card w-50 h-25" src={shoe.image_url} /> */}
                                        <Card.Img className="img-card" src={variant.image_url} style={{width: "100px"}}/>

                                            <Card.Title style={{color: "yellow"}}>{variant.id} </Card.Title>
                                        
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
            
            <div>w</div>
            
   
   </>)
}