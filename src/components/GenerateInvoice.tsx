import React, { useState } from "react"
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, InputGroup, Row } from "react-bootstrap"
import { BsCheck2Circle, BsPencilSquare, BsFillPlusCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import { CustomerDetails, MemoItem } from "../models/InvoiceModels";
import { enterpriseName, itemSubTypeOptions, itemTypeOptions } from "../support/Constants";
import InvoiceForm from "./InvoiceForm";


const GenerateInvoice = () => {

    const [showInvoiceForm, setShowInvoiceForm] = useState(false);

    const handleGetStartedClick = () => {
        setShowInvoiceForm(true)
    }

    const handleReturnToGenerateInvoice = () => {
        setShowInvoiceForm(false)
    }

    return (
        <>
            {!showInvoiceForm && (<Card className="mt-3 ms-3 me-5 content">
                <Card.Body>
                    <Card.Title as="h2">Prepare your Invoice here!</Card.Title>
                    <Button className="mt-3" variant="secondary" onClick={handleGetStartedClick}>Get Started!!</Button>
                </Card.Body>
            </Card>)}
            {showInvoiceForm && (<InvoiceForm onClickArrowLeft={handleReturnToGenerateInvoice}/>)}
        </>

    )

}

export default GenerateInvoice