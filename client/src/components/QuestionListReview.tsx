import { Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import './stylesheets/PreviewForm.css'
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";

type QuestionListReviewProps = {
    currentPageIndex: number,
    question: QuestionAnswer, 
    questionIndex: number,
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}

function QuestionListReview({ currentPageIndex, question, questionIndex, setAnswerPages }: QuestionListReviewProps) {

    const handleRadioChange = (answer: string, id: string) => {
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage]; 
            updatedAnswerPage[currentPageIndex].questions[questionIndex].answer = answer; 
            return updatedAnswerPage;
        })
    };
    
    return (
                    <Form className="questionBox p-3 mb-3">
                        <Row>
                            <Col md={12}>
                                <FormLabel className="question-label"><p>{question.question}</p></FormLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Check
                                    inline
                                    name="binary"
                                    key={questionIndex}
                                    id={`step-${questionIndex}`} // Add a unique id for each checkbox
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
                                    key={questionIndex}
                                    id={`step-${questionIndex}`} // Add a unique id for each checkbox
                                    type="radio"
                                    value="No"
                                    label={<p>No</p>}
                                    checked={question.answer === "No"}
                                    className="text-start custom-checkbox"
                                    onChange={(e) => handleRadioChange(e.target.value, question.id)}
                                />
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Check
                                    inline
                                    name="binary"
                                    key={questionIndex}
                                    id={`step-${questionIndex}`} // Add a unique id for each checkbox
                                    type="radio"
                                    value="Don't know"
                                    label={<p>Don't know</p>}
                                    checked={question.answer === "Don't know"}
                                    className="text-start custom-checkbox"
                                    onChange={(e) => handleRadioChange(e.target.value, question.id)}
                                />
                            </Col>
                        </Row>
                    </Form>
                )
}

export default QuestionListReview;