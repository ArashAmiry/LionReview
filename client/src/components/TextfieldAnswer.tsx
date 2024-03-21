import { Container } from "react-bootstrap";
import './stylesheets/TextfieldAnswer.css'

const TextfieldAnswer = ({ answer }: { answer: string }) => {
    return (
        <Container className="my-2 answer-row">
            {answer}
        </Container>
    );
}

export default TextfieldAnswer;