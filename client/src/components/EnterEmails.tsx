import { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { ReactMultiEmail } from "react-multi-email";
import emailRegex from "./emailRegex";
import './stylesheets/EnterEmails.css';
import 'react-multi-email/dist/style.css';
import axios from "axios";

const EnterEmails = ({ reviewID, showEmail, setShowEmail }: { reviewID: string, showEmail: boolean, setShowEmail: (show: boolean) => void }) => {
    const [emails, setEmails] = useState<string[]>([]);
    const [invalidEmails, setInvalidEmails] = useState<string[]>([]);

    const handleSubmit = async () => {
        // Handle email submission logic
        console.log(emails);
        console.log(reviewID);
        await axios.post('http://localhost:8080/review/distribute', {
                "emails": emails,
                "reviewID": reviewID
            }).catch((error: Error) => {
                console.log(error);
            });
    }

    return (
        <Modal
            show={showEmail}
            onHide={() => setShowEmail(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="emails-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter Email
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactMultiEmail
                    placeholder="Paste however many email addresses"
                    emails={emails}
                    validateEmail={email => {
                        const isValid = emailRegex.test(email);
                        if (!isValid) {
                            setInvalidEmails([...invalidEmails, email]);
                        }
                        return isValid;
                    }}
                    onChange={(_emails: string[]) => setEmails(_emails)}
                    getLabel={(email: string, index: number, removeEmail: (index: number) => void) => (
                        <div data-tag key={index}>
                            {email}
                            <span data-tag-handle onClick={() => removeEmail(index)}>
                                ×
                            </span>
                        </div>
                    )}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleSubmit()}>Send emails</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EnterEmails;