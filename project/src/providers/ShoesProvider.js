import React, { useState } from 'react';
import axios from 'axios';
import ShoeContext from '../contexts/ShoeContext';


const BASE_URL = "https://3030-harizhash-beproject3-l04rucih8ee.ws-us83.gitpod.io/api";


export default function UserProvider(props) {

    const [shoes, setShoes] = useState([])
    const [variant, setVariant] = useState([])



    const shoeContext = {
        getAllShoe: () => {
            return shoes;
        },
        getAllVariant:() =>
        {
            return variant;
        },
        getShoeBySearch: async (query) => {
            const response = await axios.get(BASE_URL + '/product/search', {
                params: query
            })
            console.log("Search data" + response.data)
            const shoes = response.data.shoes
            setShoes(shoes)
            return shoes;
        },
        getSearchOptions: async () => {
            const response = await axios.get(BASE_URL + '/product/search_options');
            console.log("Search options " + response.data.options)
            const searchOptions = response.data.options;
            return searchOptions;
        },

        getShoeById: async (shoeId) => {
            const response = await axios.get(BASE_URL + '/product/' + shoeId);
            console.log("ID " + response.data.shoeCall.variants[0].id)
            // console.log("ID " + response.data.shoeCall.variants[0].id)
            // need to for loopp this on REACT
            const shoes = response.data.shoeCall
            return shoes;
        },
         getVariantByShoeId: async (shoeId) =>
         {
             const response = await axios.get(BASE_URL + '/product/' + shoeId +'/shoeDetails');
             console.log("HERE " + response.data.variant[0].id +" " + response.data.variant[0].cost)
             const shoes = response.data.variant;
             setVariant(shoes)
             return shoes;
         }
    }

    return (
        <ShoeContext.Provider value={shoeContext}>
            {props.children}
        </ShoeContext.Provider>
    );
}