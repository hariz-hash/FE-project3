import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function ProductCard(props) {
    const image = props.shoe.image_url
    const model = props.shoe.model
    const description = props.shoe.description
    const shoeType = props.shoe.shoe_type
    const gender = props.shoe.gender.gender
    const brand = props.shoe.brand.brand
    const materials = props.materials
   
    return (<>
        <Card className="card ">
            <div style={{ display:"flex", "justifyContent":"center"}}><Card.Img className="card-img-top my-3 my-md-3" style={{width: "fit-content", maxWidth:"25rem", maxHeight:"10rem"}}  src={image} /></div>
            <Card.Body>
                <Card.Title className="titleFont" style={{fontSize : "1.2rem"}}>{model} {shoeType} {gender} ({brand})</Card.Title>
                <Card.Text className="overflow-auto" style={{ height: "100px"}}> {description}</Card.Text> <br />
                <Button className="login-button mt-3" variant="primary" as={Link} to={`/product/${props.shoe.id}/shoeDetails`}>See more</Button>
            </Card.Body>
        </Card>
    </>)
}