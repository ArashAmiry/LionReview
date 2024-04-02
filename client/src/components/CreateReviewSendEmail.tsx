import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { ReactMultiEmail } from "react-multi-email";
import { useNavigate } from "react-router-dom";
import emailRegex from "./emailRegex";
import './stylesheets/EnterEmails.css';
import 'react-multi-email/dist/style.css';
import axios from "axios";

const CreateReviewSendEmail = ({ submitReview, showEmail, setShowEmail }: { submitReview: (e: React.MouseEvent) => void, showEmail: boolean, setShowEmail: (show: boolean) => void }) => {
    const [emails, setEmails] = useState<string[]>([]);
    const [invalidEmails, setInvalidEmails] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSendEmails = async (e: React.MouseEvent) => {
        const reviewID = await submitReview(e); 
        console.log(reviewID);
        console.log(emails);
        await axios.post('http://localhost:8080/review/distribute', {
                "emails": emails,
                "reviewID": reviewID
            }).catch((error: Error) => {
                console.log(error);
            });
        navigate("/myReviews");
    }

    const handleSkip = async (e: React.MouseEvent) => {
        // Handle email submission logic
        await submitReview(e);
        navigate("/myReviews");
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
                <Button variant="secondary" onClick={(e) => handleSkip(e)}>Send later</Button>
                <Button onClick={(e) => handleSendEmails(e)}>Send emails</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateReviewSendEmail;