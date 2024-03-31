import { Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import './stylesheets/PreviewForm.css'
import { AnswerPage } from "../pages/RespondentReview";

type QuestionListReviewProps = {
    currentPageIndex: number,
    answerPages: AnswerPage[], 
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}

function QuestionListReview({ currentPageIndex, answerPages, setAnswerPages }: QuestionListReviewProps) {
    const binaryQuestions = answerPages[currentPageIndex].binaryQuestions;

    const handleRadioChange = (answer: string, id: string) => {
        const questionIndex = binaryQuestions.findIndex(q => q.id === id);
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage]; 
            updatedAnswerPage[currentPageIndex].binaryQuestions[questionIndex].answer = answer; 
            return updatedAnswerPage;
        })
    };
    
    return (
        <>
            {binaryQuestions
                .filter(question => question.question !== "")
                .map((question, index) => (
                    <Form className="questionBox p-3 mb-3">
                        <Container>
                            <Row>
                                <Col>
                                    <p>{question.question}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Check
                                        inline
                                        name="binary"
                                        key={index}
                                        id={`step-${index}`} // Add a unique id for each checkbox
                                        type="radio"
                                        value="Yes"
                                        label={<p>Yes</p>}
                                        checked={question.answer === "Yes"}
                                        className="text-start custom-checkbox"
                                        onChange={(e) => handleRadioChange(e.target.value, question.id)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Check
                                        inline
                                        name="binary"
                                        key={index}
                                        id={`step-${index}`} // Add a unique id for each checkbox
                                        type="radio"
                                        value="No"
                                        label={<p>No</p>}
                                        checked={question.answer === "No"}
                                        className="text-start custom-checkbox"
                                        onChange={(e) => handleRadioChange(e.target.value, question.id)}
                                    />
                                </Col>
                            </Row>
                         </Container>
                    </Form>
                ))
            }
        </>
    )
}

export default QuestionListReview;