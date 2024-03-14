import { Col, Form, FormLabel, Row } from "react-bootstrap";
import './stylesheets/QuestionListReview.css'

function QuestionListReview({ questions }: { questions: { id: string, question: string, answer: string }[] }) {

    const handleRadioChange = (answer: string, id: string) => {
        const questionIndex = questions.findIndex(q => q.id === id);
        questions[questionIndex].answer = answer;
      };
    
    return (
        <>
            {questions
                .filter(question => question.question !== "")
                .map((question, index) => (
                    <Form className="binary-row p-3 mb-3">
                        <Row>
                            <Col md={12}>
                                <FormLabel><p>{question.question}</p></FormLabel>
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
                                    className="text-start custom-checkbox"
                                    onChange={(e) => handleRadioChange(e.target.value, question.id)}
                                />
                            </Col>
                        </Row>
                    </Form>
                ))
            }
        </>
    )
}

export default QuestionListReview;