import { Button, Card } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import "./stylesheets/PreviewFormSidebar.css";
import { useState } from "react";
import ReviewNameModal from "./ReviewNameModal";
import CreateReviewSendEmail from "./CreateReviewSendEmail";

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
    setRandomize: (randomize: Boolean) => void;
};

function PreviewFormSidebar({ submitReview, addNewPage, setReviewName, reviewTitle, questions, textfields, previousStep, setRandomize }: PreviewFormSidebarProps) {
    const [show, setShow] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateForm = (e: React.MouseEvent) => {
        handleClose();
        setShowEmailModal(true);
    }

    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionList questions={questions} />
                <TextfieldList textfields={textfields} />

            </Card.Body>

            <Button className="step-3-btn" size="lg" onClick={handleShow} variant="success">Finalize Form</Button>
            <Button className="step-3-btn" size="lg" variant="primary" onClick={addNewPage}>Add New Page</Button>
            <Button className="step-3-btn" size="lg" variant="light" onClick={() => previousStep()}>Back</Button>

            <CreateReviewSendEmail submitReview={submitReview} showEmail={showEmailModal} setShowEmail={setShowEmailModal} />
            <ReviewNameModal show={show} handleClose={handleClose} handleCreateForm={handleCreateForm} setReviewName={setReviewName} setRandomize={(randomize: Boolean) => setRandomize(randomize)} />
        </Card>
    )
}

export default PreviewFormSidebar;