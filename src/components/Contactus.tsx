import React from "react"
import { Col, Container, Row } from "react-bootstrap"

const Contactus = () => {
    return (
        <div className="contactus">
            <Container className="mt-5 content">
                <Row>
                    <Col>
                        <h2>Contact Us</h2>
                        <p>If you have any questions or need support, feel free to reach us at:</p>
                        <p>
                            <strong>Email:</strong> <a href="mailto:harishsingla89@gmail.com">harishsingla89@gmail.com</a>
                        </p>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Contactus