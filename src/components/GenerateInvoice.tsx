import React, { useState } from "react"
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { FaPlus, FaEdit } from 'react-icons/fa';

const GenerateInvoice = () => {
    const enterpriseName = "M/S. Skyline Invoices Pvt. Ltd.";
    const [customerName, setCustomerName] = useState('');
    const [isCustomerNameEditable, setIsCustomerNameEditable] = useState(true);

    // Function to handle customer name change
    const handleCustomerNameChange = (e: { target: { value: string; }; }) => {
        setCustomerName(e.target.value);
    };

    // Function to toggle the editability of the customer name
    const toggleCustomerNameEdit = () => {
        setIsCustomerNameEditable(!isCustomerNameEditable);
    };

    return (
        <Container className="invoice-form-container">
            <h2 className="mt-3">Invoice Generator</h2>
            <Form>
                <Row className="align-items-center mb-3">
                    <Col md={12}>
                        <Form.Control
                            type="text"
                            value={enterpriseName}
                            readOnly
                            plaintext
                            className="form-control"
                        />
                    </Col>
                </Row>
                <Row className="align-items-center mb-3">
                    <Col md={2}>
                        <Form.Label className="form-label">Customer Name</Form.Label>
                    </Col>
                    <Col md={10}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter customer name"
                                value={customerName}
                                onChange={handleCustomerNameChange}
                                readOnly={!isCustomerNameEditable}
                                className="form-control"
                                onBlur={() => setIsCustomerNameEditable(false)} // Make field read-only when it loses focus
                            />
                            {!isCustomerNameEditable && (
                                <InputGroup.Text
                                    onClick={toggleCustomerNameEdit}
                                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                                >
                                    <FaEdit />
                                </InputGroup.Text>
                            )}
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default GenerateInvoice