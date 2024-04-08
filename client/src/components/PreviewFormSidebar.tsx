import { Button, Card } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import "./stylesheets/PreviewFormSidebar.css";
import { useState } from "react";
import ReviewNameModal from "./ReviewNameModal";
import CreateReviewSendEmail from "./CreateReviewSendEmail";
import RangeQuestionListPreview from "./RangeQuestionList";
import { Toast } from 'react-bootstrap';

type Question = {
    questionType: string;
    question: string;
};

type PreviewFormSidebarProps = {
    reviewTitle: string;
    questions: Question[];
    submitReview: (e: React.MouseEvent) => void;
    addNewPage: (e: React.MouseEvent) => void;
    setReviewName: (name: string) => void;
    previousStep: () => void;
    setRandomize: (randomize: Boolean) => void;
};

function PreviewFormSidebar({ submitReview, addNewPage, setReviewName, reviewTitle, questions, previousStep, setRandomize }: PreviewFormSidebarProps) {
    const [show, setShow] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showToast, setShowToast] = useState(false);


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
                {questions.map((question, index) => (
                    <div key={index}>
                        {question.questionType === "binary" && (
                            <QuestionList questions={[question]} />
                        )}
                        {question.questionType === "text" && (
                            <TextfieldList textfields={[question]} />
                        )}
                        {question.questionType === "range" && (
                            <RangeQuestionListPreview rangeQuestions={[question]} />
                        )}
                    </div>
                ))}
            </Card.Body>

            <Button className="step-3-btn" size="lg" onClick={handleShow} variant="success">Finalize Form</Button>
            <Button className="step-3-btn" size="lg" variant="primary" onClick={addNewPage}>Add New Page</Button>
            <Button className="step-3-btn" size="lg" variant="light" onClick={() => previousStep()}>Back</Button>

            <CreateReviewSendEmail submitReview={submitReview} showEmail={showEmailModal} setShowEmail={setShowEmailModal} setShowToast={setShowToast} />
            <ReviewNameModal show={show} handleClose={handleClose} handleCreateForm={handleCreateForm} setReviewName={setReviewName} setRandomize={(randomize: Boolean) => setRandomize(randomize)} />
            {/* Fixed position Toast at the top of screen */}
            <div style={{ position: 'fixed', top: '11vh', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="light">
                    <Toast.Header>
                        <strong className="me-auto">Email sent</strong>
                    </Toast.Header>
                    <Toast.Body className="text-black">The review has now been sent to the reviewers. You will be directed to the "My Reviews" page.</Toast.Body>
                </Toast>
            </div>
        </Card>
    )
}

export default PreviewFormSidebar;