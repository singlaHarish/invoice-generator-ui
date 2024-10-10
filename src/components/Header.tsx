import React from "react"
import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <NavbarBrand>SkyLine Invoice Generator</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="ms-auto menu-links">
                        <NavLink as={Link} to="/home">Home</NavLink>
                        <NavLink as={Link} to="/generate">Generate Invoice</NavLink>
                        <NavLink as={Link} to="contactus">ContactUs</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>

    )
}

export default Header