import CreateReviewForm from "./CreateReviewForm";
import Container from "react-bootstrap/esm/Container";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import './stylesheets/CreateReview.css'
import PreviewForm from "./PreviewForm";
import { Form, Row } from "react-bootstrap";
import AddCodeLink from "./AddCodeLink";
import CodePreviewPage from "./CodePreview";
import { CodeFile } from './CodePreview';
import axios from 'axios';
import PreviewFormSidebar from "./PreviewFormSidebar";

function CreateReview() {
    const [currentStep, setCurrentStep] = useState(1);
    const [binaryQuestions, setBinaryQuestions] = useState<{questionType: string, question: string}[]>([{questionType: "binary", question: ""}]);
    const [textFieldQuestions, setTextfieldQuestions] = useState<{questionType: string, question: string}[]>([{questionType: "text", question: ""}]);
    const [reviewTitle, setReviewTitle] = useState<string>("");
    const [urls, setUrls] = useState<string[]>([""]);
    const [cachedFiles, setCachedFiles] = useState<Record<string, CodeFile>>({});
    const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
    const [invalidURLExists, setInvalidURLExists] = useState<boolean>(true);
    const [formErrorMessage, setFormErrorMessage] = useState<string>("");
    const amountSteps = 3;
    const navigate = useNavigate();

    const updateCachedFiles = (url: string, fileData: CodeFile) => {
        setCachedFiles(prevState => ({
            ...prevState,
            [url]: fileData
        }));
    };

    const getNonEmptyQuestions = (questions : {questionType: string, question: string}[]) => {
        return questions.filter(question => question.question.trim() !== '');
    };

    const nextStep = () => {
        if (currentStep === 1) {
            setTriedToSubmit(true);
            if (invalidURLExists) {
                return
            } 
        } else if (currentStep === 2) {
            if (getNonEmptyQuestions([...binaryQuestions, ...textFieldQuestions]).length === 0) {
                setFormErrorMessage("At least one question is required to continue.")
                return
            } else {
                setFormErrorMessage("");
            }
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

    const submitReview = async (event: React.MouseEvent) => {
        const codeSegments : {filename : string, content: string}[] = [];
        Object.entries(cachedFiles).forEach(record => {
        const filename = record[1].name;
        const content = record[1].content;
        
        codeSegments.push({
            "filename": filename,
            "content": content
        })});


        await axios.post('http://localhost:8080/review', {
            "name": "temporaryName",
            "createdBy": "username",
            "pages": [{
                "formName": reviewTitle,
                "codeSegments": codeSegments,
                "questions": [...getNonEmptyQuestions(binaryQuestions), ...getNonEmptyQuestions(textFieldQuestions)]
            }]
        });
    }

    return (
        <Container fluid className="m-0 p-0">
            {currentStep === 1 &&
                <Row className="first-step">
                    <AddCodeLink urls={urls} setUrls={(urls: string[]) => setUrls(urls)} setInvalidURLExists={setInvalidURLExists} triedToSubmit={triedToSubmit} invalidURLExists={invalidURLExists}/>
                </Row>
            }
            {currentStep === 2 &&
                <Row className="second-step">
                    <Col md={7} className="form-box px-0">

                        <Row className="pb-3">
                            <Col md={12}><Form.Control name="desc" type="text" value={reviewTitle} placeholder={`Title of review form...`} onChange={(e) => handleChangeReviewTitle(e)} />
                            </Col>
                        </Row>
                        <Row>
                            {currentStep === 2 && <CreateReviewForm
                                questions={binaryQuestions} setQuestions={(questions) => setBinaryQuestions(questions)}
                                textfields={textFieldQuestions} setTextfields={(textfields) => setTextfieldQuestions(textfields)} />}
                        </Row>
                    </Col>

                    <Col md={5}>
                        <PreviewForm reviewTitle={reviewTitle} questions={binaryQuestions} textfields={textFieldQuestions} errorMessage={formErrorMessage} />
                    </Col>
                </Row>
            }

            {currentStep === 3 &&
                <Row className="code-row">
                    <Col className="code-preview" md={9}><CodePreviewPage urls={urls} cachedFiles={cachedFiles} updateCachedFiles={updateCachedFiles} /></Col>
                    <Col md={3} className="p-0">
                        <PreviewFormSidebar submitReview={(e) => submitReview(e)} reviewTitle={reviewTitle} questions={binaryQuestions} textfields={textFieldQuestions} previousStep={() => previousStep()}/>
                    </Col>
                </Row>
            }
            {currentStep !== 3 &&
                <Row className="first-step second-step">
                    <Col md={4} id="navButtons" className="my-4 d-flex justify-content-start px-0">
                        {currentStep === 1 && <Button size="lg" variant="danger" onClick={() => previousStep()}>Exit</Button>}
                        {currentStep !== 1 && <Button size="lg" variant="light" onClick={() => previousStep()}>Back</Button>}

                        {currentStep !== amountSteps && <Button size="lg" variant="light" onClick={() => nextStep()}>Continue</Button>}
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default CreateReview;