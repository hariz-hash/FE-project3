import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


import UserContext from '../contexts/UserContext';

const API_URL = "https://3030-harizhash-beproject3-l04rucih8ee.ws-us83.gitpod.io/api"

export default function UserProvider(props) {
    const [redirectTo, setRidrecTo] = useState('')
    const navigateTo = useNavigate();

    const userContext = {

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
                console.log("HERERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR" + testaccess)
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
    };

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
}