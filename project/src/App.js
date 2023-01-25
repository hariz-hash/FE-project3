import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Menu from './components/Navigationbar';
import Products from './pages/Product';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Error from './pages/Error';
import SignUp from './pages/SignUp';
// import Logout from './pages/Logout';
import VariantList from './pages/VariantList';
import UserProvider from './providers/UserProvider';
import ShoesProvider from './providers/ShoesProvider';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutError from './pages/CheckoutError';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  return ( // userLogIn? ( SHOW : cart Link, order Link, logout Link) : (SHOW : Login link, Register Link)
    <>

      <Router>
        <UserProvider>

          <ShoesProvider>
            <Menu />
          </ShoesProvider>
          <Routes>

            <Route path='/' element={<ShoesProvider><Products /></ShoesProvider>} />
            <Route path='/cart' element={<ShoesProvider><Cart /></ShoesProvider>} />
            <Route path='/order' element={<Order />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            {/* <Route path='/logout' element={<Products />} /> */}
            <Route path='/product/:product_id/shoeDetails' element={<ShoesProvider><VariantList /></ShoesProvider>} />
            <Route path='/checkout/success' element={<UserProvider><CheckoutSuccess /></UserProvider>} />
            <Route path='/checkout/error' element={<UserProvider><CheckoutError /></UserProvider>} />
            <Route path='/checkout/error' element={<UserProvider><CheckoutError /></UserProvider>} />
            <Route path='/checkout' element={<UserProvider><Checkout /></UserProvider>}/>



            <Route path='*' element={<Error />} />
          </Routes>
        </UserProvider>
      </Router>

    </>
  );
}




export default App;
