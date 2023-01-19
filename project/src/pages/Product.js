import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import VariantList from '../pages/VariantList';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
export default function Product() {
    const shoeContext = useContext(ShoeContext)
    const shoe = shoeContext.getAllShoe() || [];

    const [search, setSearch] = useState({});
    const [searchOptions, setSearchOptions] = useState(false)

    const [formFields, setFormFields] = useState({
        model: '',
        shoeType: '',
        // brand_id:'0',
        // gender_id: '0',
        // materials: '0'
    })

    // useEffect(() => {
    //     (async () => {
    //         const searchOptions = await shoeContext.getSearchOptions();
    //          setSearchOptions(searchOptions);
    //     })();
    // }, []);
    useEffect(() => {
        (async () => {
            await shoeContext.getShoeBySearch(search);
        })();
    }, [search]);

    const updateFormFields = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    const searchShoes = () => {
        const query = { ...formFields };
        setSearch(query)

    }

    return (
        <>
            <h1>Product</h1>
            <Form.Group>
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" placeholder="Search by model" name="model" value={formFields.model} onChange={updateFormFields}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" placeholder="Search by shoe type" name="shoeType" value={formFields.shoeType} onChange={updateFormFields}>
                </Form.Control>
            </Form.Group>
            <Button className="btn btn-primary mt-3 ml-3" onClick={searchShoes}>Search</Button>
            <div className="tabs">
                <div className="container-fluid">
                    {shoe.length ? (
                        shoe.map((shoe) => {
                            return (
                                    
                                    <Card className="card" key={shoe.id} >
                                        <Card.Img className="img-card w-50 h-25" src={shoe.image_url} />
                                        <Card.Body>
                                            <Card.Title>{shoe.model} {shoe.shoeType} {shoe.gender.gender} ({shoe.brand.brand})</Card.Title>
                                            <Card.Text> {shoe.description}</Card.Text> <br />
                                         
                                            {/* <Card.Text> {shoe.materials}</Card.Text> <br /> */}
                                         {/* {console.log("test")} */}
                                         {/* <Button className="mt-3" }>See more</Button> */}
                                         <Button className="btn btn-primary mt-3 ml-3" as={Link} to={`/product/${shoe.id}/shoeDetails`}>View Collection</Button>

                                        </Card.Body>
                                    </Card>
                            );
                        })
                    ) : <div>
                        <h5>No shoes found</h5>
                    </div>}
                </div>

            </div>
        </>
    )
}