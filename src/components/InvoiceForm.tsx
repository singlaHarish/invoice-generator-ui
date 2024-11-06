import React, { useMemo, useRef, useState } from "react"
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, InputGroup, Row } from "react-bootstrap"
import { BsCheck2Circle, BsPencilSquare, BsFillPlusCircleFill, BsFillTrash3Fill, BsArrowLeftCircle, BsArrowCounterclockwise, BsFileEarmarkPdf, BsDatabaseAdd  } from "react-icons/bs";
import { CustomerDetails, MemoDetails, MemoItem } from "../models/InvoiceModels";
import { enterpriseName, gst, itemSubTypeOptions, itemTypeOptions, subTotal, totalBill } from "../support/Constants";
import { calculateFinalBill, calculateGST, calculateSubTotal } from "../support/InvoiceFormSupport";
import { useReactToPrint } from "react-to-print";
import { useSaveMemoDetailsMutation } from "../api/invoice-generator-api";

interface InvoiceFormProps {
    onClickArrowLeft: () => void;
}


const InvoiceForm = ({ onClickArrowLeft }: InvoiceFormProps) => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        customerName: '',
        address: '',
        contact: ''
    });
    const [isInvoiceEditable, setIsInvoiceEditable] = useState(true);
    const [memoItems, setMemoItems] = useState<MemoItem[]>([]);
    const [validated, setValidated] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const [saveMemoDetails] = useSaveMemoDetailsMutation()

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

    const handleReset = () => {
        // If the form reference exists, reset the form
        if (formRef.current) {
            formRef.current.reset();
        }
        setCustomerDetails({ customerName: '', address: '', contact: '' });
        setMemoItems([]); // Clear the memo items
        setIsInvoiceEditable(true)
    };

    const handleSaveInvoiceForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);
            toggleInvoiceEdit()
        }
    }

    // Calculate subtotal
    const subTotalAmount = useMemo(() => calculateSubTotal(memoItems), [memoItems]);
    // Calculate GST based on the subtotal
    const gstAmount = useMemo(() => calculateGST(subTotalAmount, 18), [subTotalAmount]);
    // Calculate final bill
    const finalBill = useMemo(() => calculateFinalBill(subTotalAmount, gstAmount), [subTotalAmount, gstAmount]);

    const handlePrint = useReactToPrint({
        contentRef: formRef,
    })

    const handleSaveToDatabase = async () => {
        try {
            const response = await saveMemoDetails({
               customerName: customerDetails.customerName,
               address: customerDetails.address,
               contact: customerDetails.contact,
               invoiceDate: new Date().toLocaleDateString(),
               billAmount: finalBill.toString(),
               memoItems: memoItems
            }).unwrap()
        } catch(error) {
            console.error('Error saving memo details:', error)
        }
    }

    return (
        <Container>
            <Row>
                <Col className="text-end">
                    <BsArrowLeftCircle className="me-2" onClick={onClickArrowLeft} />
                    <BsArrowCounterclockwise className="me-2" onClick={handleReset} />
                    {!isInvoiceEditable && (
                        <BsPencilSquare className="me-2"
                            onClick={toggleInvoiceEdit}
                        />
                    )}
                    {isInvoiceEditable && (
                        <BsCheck2Circle className="me-2"
                            onClick={() => formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }))}
                        />
                    )}
                    {!isInvoiceEditable && memoItems.length > 0 && (
                        <BsFileEarmarkPdf className="me-2" onClick={() => handlePrint()}/>
                    )}
                    {!isInvoiceEditable && memoItems.length > 0 && (
                        <BsDatabaseAdd className="me-2" onClick={() => handleSaveToDatabase()}/>
                    )}
                </Col>
            </Row>
            <Form noValidate validated={validated} ref={formRef} className="invoice-form-container" onSubmit={handleSaveInvoiceForm}>
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
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid customer name.
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid address.
                            </Form.Control.Feedback>
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
                                    required
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
                        <Col md={2}>
                            <Form.Group controlId={`itemsubtype-${index}`}>
                                <Form.Control
                                    required
                                    as="select"
                                    name="itemSubType"
                                    value={memoItem.itemSubType}
                                    onChange={(e) => handleInputChange(index, e)}
                                    disabled={!isInvoiceEditable || !memoItem.itemType}
                                >
                                    <option value="">Select Sub Type</option>
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
                                    required
                                    type="number"
                                    name="ratePerItem"
                                    value={memoItem.ratePerItem}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Rate"
                                    disabled={!isInvoiceEditable}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup controlId={`quantity-${index}`}>
                                <FormControl
                                    required
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
                {memoItems.length > 0 && !isInvoiceEditable &&
                    <Row className="mb-3">
                        <Col md={2}>
                            <Form.Control
                                type="text"
                                value={subTotal}
                                readOnly
                                plaintext
                            />
                        </Col>
                        <Col md={9}>
                            <InputGroup>
                                <InputGroup.Text id="INR-symbol">₹</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    name="subtotal"
                                    value={subTotalAmount}
                                    readOnly
                                    disabled={!isInvoiceEditable}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                }
                {memoItems.length > 0 && !isInvoiceEditable &&
                    <Row className="mb-3">
                        <Col md={2}>
                            <Form.Control
                                type="text"
                                value={gst}
                                readOnly
                                plaintext
                            />
                        </Col>
                        <Col md={9}>
                            <InputGroup>
                                <InputGroup.Text id="INR-symbol">₹</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    name="gstamount"
                                    value={gstAmount}
                                    readOnly
                                    disabled={!isInvoiceEditable}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                }
                {memoItems.length > 0 && !isInvoiceEditable &&
                    <Row>
                        <Col md={2}>
                            <Form.Control
                                type="text"
                                value={totalBill}
                                readOnly
                                plaintext
                            />
                        </Col>
                        <Col md={9}>
                            <InputGroup>
                                <InputGroup.Text id="INR-symbol">₹</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    name="totalbill"
                                    value={finalBill}
                                    readOnly
                                    disabled={!isInvoiceEditable}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                }
            </Form>
        </Container>
    )
}

export default InvoiceForm