import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
export default function Product(props) {
    const shoeContext = useContext(ShoeContext)
    const shoe = shoeContext.getAllShoeSearched() || [];

    const [search, setSearch] = useState({});

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
                                    
                                <div key={shoe.id}>
                                <ProductCard shoe={shoe} />
                            </div>
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