import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Menu from './components/navigationbar';
import Products from './pages/Product';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Error from './pages/Error';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import VariantList from './pages/VariantList';
import UserProvider from './providers/UserProvider';
import ShoesProvider from './providers/ShoesProvider';

function App() {
  return ( // userLogIn? ( SHOW : cart Link, order Link, logout Link) : (SHOW : Login link, Register Link)
    <>

      <Router>
        <UserProvider>
          <h1>In this APP.JS open</h1>
          <ShoesProvider>
          <Menu />
          </ShoesProvider>
          <Routes>
           
            <Route path='/' element={ <ShoesProvider><Products /></ShoesProvider>} />
            
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/logout' element={<Products />} />
            <Route path='/product/:product_id/shoeDetails' element={<ShoesProvider><VariantList/></ShoesProvider>} />
            <Route path='/cart/:variant_id/add' element={<ShoesProvider><Cart/></ShoesProvider>} />

            <Route path='*' element={<Error />} />
          </Routes>
        </UserProvider>
      </Router>

      <h1>In this APP.JS Closing</h1>
    </>
  );
}




export default App;
