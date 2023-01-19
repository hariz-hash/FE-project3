import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from '../contexts/UserContext';

export default function Menu() {
  // const userContext = userContext(UserContext);
  const userContext = useContext(UserContext);
  // console.log(typeof userContext)
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand href="#home">DASH</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {
            userContext.checkIfAuthenticated() ? (
              <Nav>
                <Nav className="me-auto">
                    <Link className="text-decoration-none text-white" to="/">
                      Gallery
                    </Link>
                 

                
                    <Link className="text-decoration-none text-white" to="/cart">
                      Cart
                    </Link>
                
                    <Link className="text-decoration-none text-white" to="/order">
                      Orders
                    </Link>
                 
                </Nav>
                <Nav className="gap-2">

              
                    <Link className="text-decoration-none text-white" to="/">
                      Log Out
                    </Link>
                </Nav>
              </Nav>

            ) : (
              <Nav>
                <Nav className="me-auto">
                    <Link className="text-decoration-none text-white" to="/">
                      Gallery
                    </Link>

                </Nav>
                <Nav className="gap-2">
                    <Link className="text-decoration-none text-white" to="/login">
                      Login
                    </Link>
                    <Link className="text-decoration-none text-white" to="/signUp">
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