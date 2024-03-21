import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import "./stylesheets/PreviewFormSidebar.css";
import { ChangeEvent, useState } from "react";

type Question = {
    questionType: string;
    question: string;
};
  
type PreviewFormSidebarProps = {
    reviewTitle: string;
    questions: Question[];
    textfields: Question[];
    submitReview: (e: React.MouseEvent) => void;
    addNewPage: (e: React.MouseEvent) => void;
    setReviewName: (name: string) => void;
    previousStep: () => void;
};

function PreviewFormSidebar({submitReview, addNewPage, setReviewName, reviewTitle, questions, textfields, previousStep} : PreviewFormSidebarProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionList questions={questions} />
                <TextfieldList textfields={textfields}/>
                
            </Card.Body>

            <Button size="lg" onClick={handleShow} variant="success">Finalize Form</Button> 
            <Button size="lg" variant="primary" onClick={addNewPage}>Add New Page</Button>
            <Button size="lg" variant="light" onClick={() => previousStep()}>Back</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Gregorys Review"
                        autoFocus
                        required
                        onChange={(e) => {
                            const { value } = e.target;
                            setReviewName(value);
                        }}
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitReview}>
                    Create Form
                </Button>
                </Modal.Footer>
           </Modal>
        </Card>
    )
}

export default PreviewFormSidebar;