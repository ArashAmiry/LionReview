import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { ReactMultiEmail } from "react-multi-email";
import emailRegex from "./emailRegex";
import './stylesheets/EnterEmails.css';
import 'react-multi-email/dist/style.css';
import axios from "axios";

const EnterEmails = ({ reviewID, showEmail, setShowEmail, displayToast }: { reviewID: string, showEmail: boolean, setShowEmail: (show: boolean) => void, displayToast: () => void }) => {
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
        setShowEmail(false);
        displayToast();
    }

    useEffect(() => {
        setEmails([]);
    }, [reviewID]);

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
                    Enter Email Addresses
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactMultiEmail
                    placeholder="Enter the email addresses of the reviewers"
                    emails={emails}
                    validateEmail={(email: string) => {
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
                    className="multi-email-body"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant= "completeform" onClick={() => handleSubmit()}>Send emails</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EnterEmails;