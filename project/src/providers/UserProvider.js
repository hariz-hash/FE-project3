import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


import UserContext from '../contexts/UserContext';

const API_URL = "https://3030-harizhash-beproject3-l04rucih8ee.ws-us83.gitpod.io/api"

export default function UserProvider(props) {
    const [redirectTo, setRidrecTo] = useState('')
    const navigateTo = useNavigate();
    const [getCart, setGetCart] = useState() || []
    const userContext = {

        // getAllCart() {
        //     return getCart;
        // },

        checkIfAuthenticated: () => {
            if (JSON.parse(localStorage.getItem('accessToken')) && JSON.parse(localStorage.getItem('refreshToken'))) {
                return true;
            }
            return false;
        },
        login: async (dataInput) => {
            try {
                const response = await axios.post(API_URL + '/user/login', dataInput)

                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;

                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
                const testaccess = JSON.parse(localStorage.getItem('accessToken'))
                console.log("HERE" + testaccess)
                if (redirectTo) {
                    navigateTo(redirectTo);
                    setRidrecTo('');
                }
                else {
                    navigateTo('/')
                }
            } catch (e) {
                console.log(e)
            }
        },
        logout: async (option = '') => {
            try {
                const response = await axios.post(API_URL + '/user/logout', {
                    refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
                })

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                if (option !== 'expire') {
                    toast.success('Logged out successfully');
                    navigateTo('/');
                }
            } catch (e) {
                console.log(e)
            }
        },
        addToCart: async (variantId) => {

            // await userContext.refreshToken();
            const response = await axios.post(API_URL + `/cart/${variantId}/add`, {}, {
                headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
            })
                .then((response) => {
                    console.log('response', response.data)

                })
                .catch((error) => {
                    alert('error', error.response)
                    // dispatch(userUpdateProfileFail())

                })
            console.log(response)


            const testaccess = JSON.parse(localStorage.getItem('accessToken'))
            console.log("in add to cart  " + testaccess)
            // const result = response.data;
            alert("Shoe added to cart!");
        },
        getCart: async () => {
            const response = await axios.get(API_URL + '/cart', {
                headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
            })
            const getCart = response.data.cartItems;
            console.log(getCart)
            // setGetCart(getCart)
            return getCart;
        },
        deleteCartItem: async (variantId) => {
            const response = await axios.delete(API_URL + `/cart/${variantId}/remove`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });
            alert("Shoe has been deleted!");
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //  if (redirectTo) {
            //         navigateTo(redirectTo);
            //         setRidrecTo('/');
            //         console.log("1")
            //     }
            //     else {

            //         navigateTo('/cart')
            //         console.log("2")
            //         setRidrecTo('/cart');


            //     }
            return response

        },
        updateCartItem: async (variantId, quantity) => {
            const response = await axios.put(API_URL + `/cart/${variantId}/update`, {
                quantity: parseInt(quantity)
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });
            // toast.success("Quantity updated");
            console.log(response.data)
            return response
        },
        checkout: async (getAllCartItems) => {
            const cartItems = getAllCartItems;

            if (!cartItems || !cartItems.length) {
                return false
            }

            const response = await axios.get(API_URL + '/checkout', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });

            console.log("checkout", response.data);
            return response.data
        },
    };

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
}