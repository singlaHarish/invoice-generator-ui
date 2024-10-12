import React from "react"
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
    return (
        <div className="home">
            <Container className="mt-5 content">
                <Row>
                    <Col>
                        <h2>Welcome to our easy-to-use invoice generator, designed specifically for small shopkeepers!</h2>
                    </Col>
                    <p className="welcomepage">
                        With our tool, you can quickly create proessional invoices by simply inputting the items purchased by your customers.
                        Once completed, you can generate a PDF version of the invoice, ready for printing or sharing digitally.
                        Say goodbye to the hassle of manual paperwork and focus on what matters most running your business.
                        Streamline your invoicing process with us today!
                    </p>
                </Row>
            </Container>
        </div>


    )
}

export default Home;