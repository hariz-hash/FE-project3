import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Menu() {
  // const userContext = userContext(UserContext);
  const userContext = useContext(UserContext);
  // console.log(typeof userContext)

  const showToastMessageLogOut = () => {
    toast.success('Log out !', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const handleLogout = () => {
    showToastMessageLogOut()
    userContext.logout()
  }

  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" className="p-3 navbarColour">
      <Container>
        <ToastContainer />
        <Navbar.Brand href="/"><span style={{ color: "orange", fontSize: "2rem"}}> <i>DASH</i></span>OES</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {
            userContext.checkIfAuthenticated() ? (
              <Nav>
                <Nav className="me-auto p-2">
                  <Link className="text-decoration-none text-white p-2 m-2 " to="/">
                    Gallery
                  </Link>
                  <Link className="text-decoration-none text-white p-2 m-2" to="/cart">
                    Cart
                  </Link>

                  <Link className="text-decoration-none text-white p-2 m-2" to="/order">
                    Order History
                  </Link>

                  <Link className="text-decoration-none text-white p-2 m-2" onClick={handleLogout}>
                    Log Out
                  </Link>
                </Nav>
              </Nav>

            ) : (
              <Nav>
                <Nav className="me-auto p-2">
                  <Link className="text-decoration-none text-white p-2 m-2" to="/">
                    Gallery
                  </Link>
                  <Link className="text-decoration-none text-white p-2 m-2" to="/login">
                    Login
                  </Link>
                
                  <Link className="text-decoration-none text-white p-2 m-2" to="/signUp">
                    Sign Up
                  </Link>
                </Nav>
             
              
            
              </Nav>
            )
          }
        </Navbar.Collapse>

      </Container>
    </Navbar>
    // <h1> IN the menu as well with navbar here</h1>
  )
}