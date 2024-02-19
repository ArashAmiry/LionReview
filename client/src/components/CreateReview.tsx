import Row from "react-bootstrap/esm/Row";
import CreateReviewForm from "./CreateReviewForm";
import Container from "react-bootstrap/esm/Container";
import { useState } from "react";

function CreateReview() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Container>
            <Row>
                <CreateReviewForm />
            </Row>
        </Container> 
    );
}

export default CreateReview;