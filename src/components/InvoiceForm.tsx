import React, { useState } from "react"
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, InputGroup, Row } from "react-bootstrap"
import { BsCheck2Circle, BsPencilSquare, BsFillPlusCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import { CustomerDetails, MemoItem } from "../models/InvoiceModels";
import { enterpriseName, itemSubTypeOptions, itemTypeOptions } from "../support/Constants";

const InvoiceForm = () => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        customerName: '',
        address: '',
        contact: ''
    });
    const [isInvoiceEditable, setIsInvoiceEditable] = useState(true);
    const [memoItems, setMemoItems] = useState<MemoItem[]>([]);

    // Function to handle customer details change
    const handleCustomerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCustomerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Toggle the editability of the fields
    const toggleInvoiceEdit = () => {
        setIsInvoiceEditable(!isInvoiceEditable);
    }

    // Get concatenated customer details as a single string
    const getConcatenatedCustomerDetails = () => {
        const { customerName, address, contact } = customerDetails;
        return `${customerName}, ${address}, ${contact}`;
    };


    // Add a new Memo item
    const handleAddMemoItem = () => {
        setMemoItems([...memoItems, { itemType: '', itemSubType: '', ratePerItem: '', quantity: '', price: '' }]);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const newItems = [...memoItems];
        newItems[index][name as keyof MemoItem] = value;

        // Clear the second attribute if the first attribute changes
        if (name === 'itemType') {
            newItems[index].itemSubType = '';
        }

        // Convert ratePerItem and quantity to numbers for arithmetic operations
        const ratePerItem = parseFloat(newItems[index].ratePerItem) || 0;
        const quantity = parseFloat(newItems[index].quantity) || 0;
        newItems[index].price = (ratePerItem * quantity).toFixed(2);

        setMemoItems(newItems);
    }

    const handleRemoveItem = (index: number) => {
        const newItems = memoItems.filter((_, i) => i !== index);
        setMemoItems(newItems);
    };

    return (
        <Container>
            <Row>
                <Col className="text-end">
                    {!isInvoiceEditable && (
                        <BsPencilSquare
                            onClick={toggleInvoiceEdit}
                        />
                    )}
                    {isInvoiceEditable && (
                        <BsCheck2Circle
                            onClick={toggleInvoiceEdit}
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
                                required
                                type="text"
                                placeholder="Enter customer name"
                                name="customerName"
                                value={customerDetails.customerName}
                                onChange={handleCustomerDetailsChange}
                                disabled={!isInvoiceEditable}
                                className="form-control"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="align-items-center mb-3">
                    <Col md={12}>
                        <InputGroup>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter customer's address"
                                name="address"
                                value={customerDetails.address}
                                onChange={handleCustomerDetailsChange}
                                disabled={!isInvoiceEditable}
                                className="form-control"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                {memoItems.length > 0 && <Row className="mb-1 text-center">
                    <Col md={3}>
                        <FormLabel>Item Type</FormLabel>
                    </Col>
                    <Col md={3}>
                        <FormLabel>Item Sub Type</FormLabel>
                    </Col>
                    <Col md={2}>
                        <FormLabel>Rate</FormLabel>
                    </Col>
                    <Col md={1}>
                        <FormLabel>Qty.</FormLabel>
                    </Col>
                    <Col md={2}>
                        <FormLabel>Price</FormLabel>
                    </Col>
                </Row>}
                {memoItems.map((memoItem, index) => (
                    <Row key={index} className="mb-3">
                        <Col md={3}>
                            <FormGroup controlId="{`itemtype-${index}`}">
                                <FormControl
                                    as="select"
                                    name="itemType"
                                    value={memoItem.itemType}
                                    onChange={(e) => handleInputChange(index, e)}
                                    disabled={!isInvoiceEditable}
                                >
                                    <option value="">Select Item Type</option>
                                    {itemTypeOptions.map((itemTypeOption) => (
                                        <option key={itemTypeOption} value={itemTypeOption}>
                                            {itemTypeOption}
                                        </option>
                                    ))}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId={`itemsubtype-${index}`}>
                                <Form.Control
                                    as="select"
                                    name="itemSubType"
                                    value={memoItem.itemSubType}
                                    onChange={(e) => handleInputChange(index, e)}
                                    disabled={!isInvoiceEditable || !memoItem.itemType}
                                >
                                    <option value="">Select Item Sub Type</option>
                                    {memoItem.itemType &&
                                        itemSubTypeOptions[memoItem.itemType as keyof typeof itemSubTypeOptions].map((ItemSubTypeOption) => (
                                            <option key={ItemSubTypeOption} value={ItemSubTypeOption}>
                                                {ItemSubTypeOption}
                                            </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <InputGroup>
                                <InputGroup.Text id="INR-symbol">₹</InputGroup.Text>
                                <FormControl
                                    type="number"
                                    name="ratePerItem"
                                    value={memoItem.ratePerItem}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Rate"
                                    disabled={!isInvoiceEditable}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={1}>
                            <FormGroup controlId={`quantity-${index}`}>
                                <FormControl
                                    type="number"
                                    name="quantity"
                                    value={memoItem.quantity}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Qty."
                                    disabled={!isInvoiceEditable}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <InputGroup>
                                <InputGroup.Text id="INR-symbol">₹</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    name="price"
                                    value={memoItem.price}
                                    readOnly
                                    placeholder="Price"
                                    disabled={!isInvoiceEditable}
                                />
                            </InputGroup>
                        </Col>
                        {isInvoiceEditable && <Col md={1}>
                            <BsFillTrash3Fill onClick={() => handleRemoveItem(index)} />
                        </Col>}
                    </Row>
                ))}
                {isInvoiceEditable && <Row>
                    <Col md={1} className="d-flex align-items-center">
                        <Button variant="secondary" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            onClick={handleAddMemoItem}>
                            <BsFillPlusCircleFill style={{ marginRight: "8px" }} />
                            Add
                        </Button>
                    </Col>
                </Row>}
            </Form>
        </Container>
    )
}

export default InvoiceForm