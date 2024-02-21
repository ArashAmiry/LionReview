import Row from "react-bootstrap/esm/Row";
import CreateReviewForm from "./CreateReviewForm";
import Container from "react-bootstrap/esm/Container";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import './stylesheets/CreateReview.css'
import PreviewForm from "./PreviewForm";
import { Form } from "react-bootstrap";

function CreateReview() {
    const [currentStep, setCurrentStep] = useState(1);
    const [questions, setQuestions] = useState<string[]>([""]);
    const [textfields, setTextfields] = useState<string[]>([""]);
    const [reviewTitle, setReviewTitle] = useState<string>("");

    const amountSteps = 3;
    const navigate = useNavigate();

    const nextStep = () => {
        if (currentStep === amountSteps) {
            // Todo
        }
        setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        if (currentStep === 1) {
            navigate("/")
            return;
        }
        setCurrentStep(currentStep - 1);
    };

    const handleChangeReviewTitle = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setReviewTitle(value);
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="form-box px-0">

                    <Row className="pb-3"><Col md={12}><Form.Control name="desc" type="text" placeholder={`Title of review form...`} onChange={(e) => handleChangeReviewTitle(e)}/></Col></Row>
                    <Row>{currentStep === 1 && <CreateReviewForm
                        questions={questions} setQuestions={(questions) => setQuestions(questions)}
                        textfields={textfields} setTextfields={(textfields) => setTextfields(textfields)} />}
                        {currentStep === 2 && <p>Hej</p>}</Row>
                </Col>
                <Col md={5}>
                    <PreviewForm reviewTitle={reviewTitle} questions={questions} textfields={textfields} />
                </Col>
            </Row>
            <Row>
                <Col md={4} id="navButtons" className="my-4 d-flex justify-content-start px-0">
                    {currentStep === 1 && <Button size="lg" variant="danger" onClick={() => previousStep()}>Exit</Button>}
                    {currentStep !== 1 && <Button size="lg" variant="light" onClick={() => previousStep()}>Back</Button>}

                    {currentStep !== amountSteps && <Button size="lg" variant="light" onClick={() => nextStep()}>Continue</Button>}
                    {currentStep === amountSteps && <Button size="lg" variant="success" onClick={() => nextStep()}>Create form</Button>}
                </Col>
            </Row>
        </Container>
    );
}

export default CreateReview;