import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from  "./pages/Login";

function App() {
  return (
    <React.Fragment>
      {/* <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home"> Test</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">Link</Nav.Link>
       
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </Router> */}
      <Login/>
    </React.Fragment>
  );
}




export default App;
