import { Col, Container, Form, FormLabel, Row } from "react-bootstrap";

function QuestionListPreview({ questions }: { questions: {questionType: string, question: string}[] }) {
    return (
        <>
            {questions
                .filter(question => question.question !== "")
                .map((question, index) => (
                    <Form key={index} className="questionBox p-3 mb-3">
                        <Container>
                            <Row>
                                <Col md={12}>
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
                                        label={<p>Yes</p>}
                                        className="text-start custom-checkbox"
                                        disabled={true}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Check
                                        inline
                                        name="binary"
                                        key={index}
                                        id={`step-${index}`} // Add a unique id for each checkbox
                                        type="radio"
                                        label={<p>No</p>}
                                        className="text-start custom-checkbox"
                                        disabled={true}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                ))}
        </>
    )
}

export default QuestionListPreview;