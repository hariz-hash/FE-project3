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
        <Card className="card p-2 m-4" style={{ width: "19rem" }}>
            <Card.Img className="card-img-top m-3" style={{ width: "15rem"}} src={image} />
            <Card.Body>
                <Card.Title>{model} {shoeType} {gender} ({brand})</Card.Title>
                <Card.Text> {description}</Card.Text> <br />
                <Button className="login-button mt-3" variant="primary" as={Link} to={`/product/${props.shoe.id}/shoeDetails`}>See more</Button>
            </Card.Body>
        </Card>
    </>)
}