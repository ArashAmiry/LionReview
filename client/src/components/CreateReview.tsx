import Row from "react-bootstrap/esm/Row";
import CreateReviewForm from "./CreateReviewForm";
import Container from "react-bootstrap/esm/Container";
import { useState } from "react";
import Col from "react-bootstrap/esm/Col";

function CreateReview() {
    const [currentStep, setCurrentStep] = useState(1);
    const [questions, setQuestions] = useState<string[]>([""]);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Container>
            <Row>
                {currentStep === 1 && <CreateReviewForm questions={questions} setQuestions={(questions) => setQuestions(questions)}/>}
                {currentStep === 2 && <p>Hej</p>}
            </Row>
            <Row>
                <Col md={4} className="d-flex justify-content-start px-0">
                    <button onClick={() => previousStep()}>Previous</button>
                    <button onClick={() => nextStep()} className="px-3">Next</button>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateReview;