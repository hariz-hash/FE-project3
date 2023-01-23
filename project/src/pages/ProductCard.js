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
    // img {
    // float: left;
    // width: 100px;
    // height: 100px;
    // object - fit: cover;
    // // }

    // width:  100px;
    // height: 100px;
    return (<>
        <Card className="card ">
            <Card.Img className="card-img-top mx-5 mx-md-3 my-5" style={{
                float: "left",
                width: "180px",//phone 250px
                height: "150px",
                objectFit: "cover"
            }} src={image} />
            <Card.Body>
                <Card.Title>{model} {shoeType} {gender} ({brand})</Card.Title>
                <Card.Text className="overflow-auto" style={{ height: "100px"}}> {description}</Card.Text> <br />
                <Button className="login-button mt-3" variant="primary" as={Link} to={`/product/${props.shoe.id}/shoeDetails`}>See more</Button>
            </Card.Body>
        </Card>
    </>)
}