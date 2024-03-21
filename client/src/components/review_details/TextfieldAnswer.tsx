import { Container } from "react-bootstrap";
import '../stylesheets/review_details/TextfieldAnswer.css'

const TextfieldAnswer = ({ answer }: { answer: string }) => {
    return (
        <Container className="my-2 answer-row">
            {answer}
        </Container>
    );
}

export default TextfieldAnswer;