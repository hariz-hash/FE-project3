import React, { useState } from 'react';
import axios from 'axios';
import ShoeContext from '../contexts/ShoeContext';


const BASE_URL = "https://3030-harizhash-beproject3-l04rucih8ee.ws-us83.gitpod.io/api";


export default function UserProvider(props) {

    const [shoeSearch, setShoeSearch] = useState([])
    const [variant, setVariant] = useState([])
    const [shoeVariant, setShoeVariant] = useState([])
    const [variantOnly, setvariantOnly] = useState([])



    const shoeContext = {
        getAllShoeSearched: () => {
            return shoeSearch;
        },
        getAllVariant:() =>
        {
            return variant;
        },
        getShoeVariant:() =>
        {
            return shoeVariant;
        },
        getVariantOnly: ()=>
        {
            return variantOnly;
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
        // getSearchOptions: async () => {
        //     const response = await axios.get(BASE_URL + '/product/search_options');
        //     console.log("Search options " + response.data.options)
        //     const searchOptions = response.data.options;
        //     return searchOptions;
        // },

        // getShoeById: async (shoeId) => {
        //     const response = await axios.get(BASE_URL + '/product/' + shoeId);
        //     console.log("ID " + response.data.shoeCall.description)
        //     const shoeVariant = response.data.shoeCall
        //     setShoeVariant(shoeVariant)
        //     return shoeVariant;
        // },
         getVariantByShoeId: async (shoeId) =>
         {
             const response = await axios.get(BASE_URL + '/product/' + shoeId +'/shoeDetails');
            //  console.log("HERE " + response.data.variant[0].id +" " + response.data.variant[0].cost)
             const shoeVariant = response.data.variant;
             console.log(shoeVariant)
             setVariant(shoeVariant)
             return shoeVariant;
         },
         getVariantByIdOnly: async (variantid) =>
         {
            const response = await axios.get(BASE_URL + '/product/' + variantid +'/variants');
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