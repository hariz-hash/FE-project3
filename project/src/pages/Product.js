import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
export default function Product(props) {
    const shoeContext = useContext(ShoeContext)
    const shoe = shoeContext.getAllShoeSearched() || [];

    const [search, setSearch] = useState({});

    const [formFields, setFormFields] = useState({
        model: '',
        shoeType: '',
        description: '',
        // brand_id:'0',
        gender_id: '0',
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
        console.log(formFields)
        const query = { ...formFields };
        setSearch(query)
    }

   
    return (
        <>
            <h1>Product</h1>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Search by name" name="model" value={formFields.model} onChange={updateFormFields}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Shoe Type</Form.Label>
                <Form.Control type="text" placeholder="Search by description" name="shoeType" value={formFields.shoeType} onChange={updateFormFields}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Search by description" name="description" value={formFields.description} onChange={updateFormFields}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                {/* <select id="myList" onchange={updateFormFields} >
                    <option value='1'> Male </option>
                    <option value='2'> female </option>
                </select>  */}
                {/* <Form>
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="Male"
                                name="group1"
                                type={type}
                                value="Male"
                                id={`inline-${type}-1`}
                                onChange={updateFormFields}
                            />
                            <Form.Check
                                inline
                                label="Female"
                                name="group1"
                                value="Female"
                                type={type}
                                id={`inline-${type}-2`}
                            />
                           
                        </div>
                    ))}
                </Form> */}
                <div>
                    <input type="radio" value="1" name="gender_id" onChange={updateFormFields} /> Male
                    <input type="radio" value="2" name="gender_id" onChange={updateFormFields} /> Female
                    <input type="radio" value="0" name="gender_id" onChange={updateFormFields} /> Both
                </div>

                {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />; */}
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