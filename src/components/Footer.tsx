import React from "react"
import { Container, Navbar, NavbarBrand } from "react-bootstrap"


const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="d-flex flex-column mt-auto">
        <div>
            <Container fluid>
                <NavbarBrand>
                &copy; {new Date().getFullYear()} SkyLine Invoice Generator. All rights reserved.
                </NavbarBrand>
            </Container>
        </div>
    </Navbar>
    )
}

export default Footer