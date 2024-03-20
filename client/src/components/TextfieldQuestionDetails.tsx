import { Container } from "react-bootstrap"
import './stylesheets/TextfieldQuestionDetails.css'

interface TextfieldQuestionDetailsProps {
    question: { _id: string, question: string };
    answers: string[] | undefined;
}

const TextfieldQuestionDetails = ({ question, answers }:TextfieldQuestionDetailsProps) => {
    return ( 
        <Container className="textfield-container">
            <h3>{question.question}</h3>
            <hr className='divider' />
            {answers && answers.map((answer) => (
                <Container>
                    {answer}
                    </Container>
            ))}
        </Container>
     );
}
 
export default TextfieldQuestionDetails;