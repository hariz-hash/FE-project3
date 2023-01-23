import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoeContext from "../contexts/ShoeContext"
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';



export default function VariantList(props) {

    const showToastMessage = () => {

        toast.success('Item added to cart successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const { product_id } = useParams();
    // console.log(product_id)
    const shoeContext = useContext(ShoeContext);
    const getShoeVariant = shoeContext.getShoeVariant() || [];
    // const variantByShoeId = shoeContext.getAllShoe() || [];
    // const variantByIdOnly = shoeContext.getVariantOnly() || [];

    const userContext = useContext(UserContext);

    // console.log({ getShoeVariant })
    // // const variant = shoeContext.getAllVariant() || [];
    // const shoeVariant = shoeContext.getShoeVariant() || [];

    // const [shoe, setShoe] = useState({});

    // //USE EFFECT
    useEffect(() => {
        (async () => {
            await shoeContext.getVariantByShoeId(product_id);


        })();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         await shoeContext.getShoeById(product_id);

    //     })();
    // }, []);

    // console.log(shoeonlyIdCall)


    async function addCart(varid) {
        showToastMessage();
        const variantid = varid
        await userContext.addToCart(varid)
    }

    return (<>

        <div className="tabs">
            <div style={{ width: "100", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <h1> Choose your colours</h1>
            </div>
            <div className="container-fluid">
                <ToastContainer />



                {getShoeVariant.length ? (



                    <div class="row row-cols-md-3">{

                        getShoeVariant.map((getShoeVariant) => {
                            return (
                                <div class="col gy-3">

                                    <Card className="card" key={getShoeVariant.id} >

                                        {/* <Card.Img className="img-card w-50 h-25" src={shoe.image_url} /> */}
                                        

                                        <div style={{ display: "flex", "justifyContent": "center" }}><Card.Img className="card-img-top my-3 my-md-3" style={{ width: "fit-content", maxWidth: "25rem", maxHeight: "10rem" }} src={getShoeVariant.image_url} /></div>

                                        {/* { addCart(variant.id)} */}
                                        <Card.Body>
                                            <Card.Title > <span style={{ fontSize: "1.5rem" }}>   <span className='titleFont' >{getShoeVariant.color.color}</span>  {getShoeVariant.shoe.model} </span> <br /> $ {getShoeVariant.cost / 100} <br /> Stock: {getShoeVariant.stock}  </Card.Title><br />
                                            {/*  */}
                                            {
                                                userContext.checkIfAuthenticated() ? ( //cart/1/add
                                                    <div>
                                                        <Button className="btn btn-primary mt-3 ml-3" as={Link} onClick={() => addCart(getShoeVariant.id)} >Add cart</Button>

                                                    </div>

                                                ) : (
                                                    <Button className="btn btn-primary mt-3 ml-3" as={Link} >Login to add cart</Button>
                                                    // <Button className="btn btn-primary mt-3 ml-3" as={Link} >add cart</Button>

                                                )
                                            }


                                            {/* <Button className="btn btn-primary mt-3 ml-3" as={Link} to={`/product/${shoe.id}/shoeDetails`}>View Collection</Button> */}

                                        </Card.Body>
                                    </Card> </div>
                            );
                        })

                    }</div>
                ) : <div>
                    <h5>No shoes found</h5>
                </div>}


            </div>

        </div>


    </>)
}