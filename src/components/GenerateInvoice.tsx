import React, { useState } from "react"
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap"
import { BsCheck2Circle, BsPencilSquare, BsFillPlusCircleFill } from "react-icons/bs";
import { CustomerDetails } from "../models/InvoiceModels";
import { enterpriseName } from "../support/Constants";


const GenerateInvoice = () => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        customerName: '',
        address: '',
        contact: ''
    });
    const [isCustomerDetailsEditable, setIsCustomerDetailsEditable] = useState(true);

    // Function to handle customer details change
    const handleCustomerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCustomerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Toggle the editability of the fields
    const toggleCustomerDetailsEdit = () => {
        setIsCustomerDetailsEditable(!isCustomerDetailsEditable);
    }

    // Get concatenated customer details as a single string
    const getConcatenatedCustomerDetails = () => {
        const { customerName, address, contact } = customerDetails;
        return `${customerName}, ${address}, ${contact}`;
    };

    const [items, setItems] = useState<string[]>([])

    // Add a new item
    const handleAddItem = () => {
        setItems([...items, `Item ${items.length + 1}`]);
    };

    return (
        <Container>
            <h2 className="mt-3">Prepare your Invoice here!</h2>
            <Row>
                <Col md={11}>
                </Col>
                <Col md={1}>
                    {!isCustomerDetailsEditable && (
                        <BsPencilSquare
                            onClick={toggleCustomerDetailsEdit}
                        />
                    )}
                    {isCustomerDetailsEditable && (
                        <BsCheck2Circle
                            onClick={toggleCustomerDetailsEdit}
                        />
                    )}
                </Col>
            </Row>
            <Form className="invoice-form-container">
                <Row className="align-items-center mb-3">
                    <Col md={10}>
                        <Form.Control
                            size="lg"
                            type="text"
                            value={enterpriseName}
                            readOnly
                            plaintext
                            className="form-control"
                        />
                    </Col>
                    <Col md={1}>
                        {new Date().toLocaleDateString()}
                    </Col>
                </Row>
                <Row className="align-items-center mb-3">
                    <Col md={12}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter customer name"
                                name="customerName"
                                value={customerDetails.customerName}
                                onChange={handleCustomerDetailsChange}
                                readOnly={!isCustomerDetailsEditable}
                                className="form-control"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="align-items-center mb-3">
                    <Col md={12}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter customer's address"
                                name="address"
                                value={customerDetails.address}
                                onChange={handleCustomerDetailsChange}
                                readOnly={!isCustomerDetailsEditable}
                                className="form-control"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                {items.map((item, index) => (
                    <Row key={index} className="align-items-center mb-3">
                        <Col md={12}>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={item}
                                    readOnly
                                    className="form-control"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                ))}
                <Row>
                    <Col md={1}>
                        <Button variant="secondary" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            onClick={handleAddItem}>
                            <BsFillPlusCircleFill style={{ marginRight: "12px" }} />
                            Add
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default GenerateInvoice