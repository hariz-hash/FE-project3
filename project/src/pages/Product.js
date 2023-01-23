import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// import '..css/style.css';
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


            <div className="container-fluid">

                <Card className="card m-4" style={{ width: "100", height :"250px" }}>
                    {/* <Card.Img className="card-img-top m-3" style={{ width: "15rem" }} src={image} /> */}
                    <Card.Body style={{ background: "black", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexDirection: "column" }}>
                        <Card.Title >DASHoes</Card.Title>
                        <Card.Text>
                            Welcome to DASHoes !
                        </Card.Text>
                        {/* <Button className="login-button mt-3" variant="primary" as={Link} to={`/product/${props.shoe.id}/shoeDetails`}>See more</Button> */}
                    </Card.Body>
                </Card>
            </div>
            <div className="container-fluid background">
                <h1 className='m-4'>Search a shoe</h1>
                <Form.Group className='m-4'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Search by name" name="model" value={formFields.model} onChange={updateFormFields}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='m-4'>
                    <Form.Label>Shoe Type</Form.Label>
                    <Form.Control type="text" placeholder="Search by description" name="shoeType" value={formFields.shoeType} onChange={updateFormFields}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='m-4'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Search by description" name="description" value={formFields.description} onChange={updateFormFields}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='m-4'>

                    <div class="d-flex justify-content-evenly">
                        <input type="radio" value="1" name="gender_id" onChange={updateFormFields} /> Male
                        <input type="radio" value="2" name="gender_id" onChange={updateFormFields} /> Female
                        <input type="radio" value="0" name="gender_id" onChange={updateFormFields} /> Both
                    </div>
                    <Button className="btn mt-3 ml-3" onClick={searchShoes}>Search</Button>

                    {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />; */}
                </Form.Group>

            </div>

            <div className="tabs">
                <div className="container-fluid">
                <h1 className='mx-4 my-2'>Choose a shoe</h1>
{/* <div class="container">
  <div class="row row-cols-3">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div> */}
                    {shoe.length ? (
                    <div class="row row-cols-md-3">{
                        shoe.map((shoe) => {
                            return (

                                <div class="col gy-3" key={shoe.id}>
                                    <ProductCard shoe={shoe} />
                                </div>
                            );
                        })}</div>
                    ) : <div>
                        <h5>No shoes found</h5>
                    </div>}
                </div>

            </div>
        </>
    )
}