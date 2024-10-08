import React from "react"
import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <NavbarBrand>SkyLine Invoice Generator</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="ms-auto menu-links">
                        <NavLink href="#home">Home</NavLink>
                        <NavLink href="#generateInvoice">Generate Invoice</NavLink>
                        <NavLink href="#contact">Contact</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>

    )
}

export default Header