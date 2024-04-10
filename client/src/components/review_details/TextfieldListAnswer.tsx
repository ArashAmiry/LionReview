import { Container, FormLabel } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import '../stylesheets/review_details/TextfieldListAnswer.css'

function TextfieldListAnswer({ textfieldQuestion, answer }: { textfieldQuestion: string, answer: string }) {

    return (
        <Container className="individual-text-container mb-3 p-3">
            <p className="mb-2 individual-text-container-label">
                {textfieldQuestion}
            </p>
            <p className="individual-text">
                {answer.length === 0 && "The question was not answered."}
                {answer.length !== 0 && answer}
            </p>
        </Container>
    )
}

export default TextfieldListAnswer