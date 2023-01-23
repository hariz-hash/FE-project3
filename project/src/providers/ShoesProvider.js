import React, { useState } from 'react';
import axios from 'axios';
import ShoeContext from '../contexts/ShoeContext';


const BASE_URL = "https://dashoes-project.onrender.com/api";


export default function UserProvider(props) {

    const [shoeSearch, setShoeSearch] = useState([])
    const [variant, setVariant] = useState([])
    const [shoeVariant, setShoeVariant] = useState([])
    const [variantOnly, setvariantOnly] = useState([])
    const [shoeId, setShoeId] = useState([])

    const shoeContext = {
        getAllShoeSearched: () => {
            return shoeSearch;
        },
        getAllVariant: () => {
            return variant;
        },
        getShoeVariant: () => {
            return shoeVariant;
        },
        getVariantOnly: () => {
            return variantOnly;
        },
        getShoeOnlyIDHere: () => {
            return shoeId;
        },
        getShoeBySearch: async (query) => {
            const response = await axios.get(BASE_URL + '/product/search', {
                params: query
            })
            console.log("Search data" + response.data)
            const shoeSearch = response.data.shoes
            setShoeSearch(shoeSearch)
            return shoeSearch;
        },

        getVariantByShoeId: async (shoeId) => {
            // console.log(shoeId)
            const response = await axios.get(BASE_URL + '/product/' + shoeId + '/shoeDetails');
            //  console.log("HERE " + response.data.variant[0].id +" " + response.data.variant[0].cost)
            const shoeVariant = response.data.variant;
            setShoeVariant(shoeVariant)
            return shoeVariant;
        },
        getVariantByIdOnly: async (variantid) => {
            const response = await axios.get(BASE_URL + '/product/' + variantid + '/variants');
            const variantOnly = response.data.onlyVariant;
            setvariantOnly(variantOnly)
            console.log("THIS IS IN THE VARIANTONLY FOR CART TEMP " + variantOnly)
            return variantOnly;
        }
    }

    return (
        <ShoeContext.Provider value={shoeContext}>
            {props.children}
        </ShoeContext.Provider>
    );
}