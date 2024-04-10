import { Container, FormLabel } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import '../stylesheets/review_details/TextfieldListAnswer.css'


function QuestionListAnswer({ binaryQuestion, answer }: { binaryQuestion: string, answer: string }) {
    return (
        <>
            <Container className="individual-binary p-3 mb-3">
                <Form>
                    <Row>
                        <Col md={12} className="individual-binary-question">
                            <FormLabel className="individual-binary-question-label"><p>{binaryQuestion}</p></FormLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Check
                                inline
                                name="binary"
                                type="radio"
                                value="Yes"
                                label={<p>Yes</p>}
                                checked={answer === "Yes"}
                                className="text-start custom-checkbox"
                                readOnly
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Check
                                inline
                                name="binary"
                                type="radio"
                                value="No"
                                label={<p>No</p>}
                                checked={answer === "No"}
                                className="text-start custom-checkbox"
                                readOnly
                            />
                        </Col>
                        <Col md={12}>

                            <Form.Check
                                inline
                                name="binary"
                                type="radio"
                                label={<p>Don't know</p>}
                                checked={answer === "Don't know"}
                                className="text-start custom-checkbox"
                                readOnly
                            />
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default QuestionListAnswer