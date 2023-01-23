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

        checkIfAuthenticated: () => {
            if (JSON.parse(localStorage.getItem('accessToken')) && JSON.parse(localStorage.getItem('refreshToken'))) {
                return true;
            }
            return false;
        },
        login: async (dataInput) => {
            const response = await axios.post(API_URL + '/user/login', dataInput)
            if (response.data.accessToken && response.data.refreshToken) {




                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;

                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
                const testaccess = JSON.parse(localStorage.getItem('accessToken'))
                console.log("HERE" + testaccess)
                console.log("Redirect " + redirectTo)
                if (redirectTo) {
                    navigateTo(redirectTo);
                    setRidrecTo('');
                }
                else {
                    navigateTo('/')
                }
                return true
            } else {

                return false;
            }
        },
        logout: async () => {
            try {
                const response = await axios.post(API_URL + '/user/logout', {
                    refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
                })

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');


                // toast.success('Logged out successfully');
                navigateTo('/');

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
                    // alert('error', error.response)
                    // dispatch(userUpdateProfileFail())

                })
            console.log(response)


            const testaccess = JSON.parse(localStorage.getItem('accessToken'))
            console.log("in add to cart  " + testaccess)

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
        register: async (userData) => {
            const response = await axios.post(API_URL + '/user/register', userData);
            if (response.data.message) {
                navigateTo('/login')
                return true
            }
            else {
                return false
            }
            console.log(response.data)
        },
        orders: async () => {
            const response = await axios.get(API_URL + '/order', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });
            const orders = response.data.orders;
            return orders;
        },
        refreshToken: async () => {
            try {
                const response = await axios.post(API_URL + '/user/refresh', {
                    refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
                }, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`

                    }

                });
                console.log("response", response.data);
                const accessToken = response.data.accessToken;
                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                return true;
            }
            catch (e) {
                console.log(e);
                if (JSON.parse(localStorage.getItem('refreshToken'))) {
                    await userContext.logout('expire');
                }
                navigateTo('/login');

                return false;
            }
        }

    };

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
}