import { Container } from "react-bootstrap"
import './stylesheets/TextfieldQuestionDetails.css'
import TextfieldAnswer from "./TextfieldAnswer";

interface TextfieldQuestionDetailsProps {
    question: { _id: string, question: string };
    answers: string[] | undefined;
}

const TextfieldQuestionDetails = ({ question, answers }:TextfieldQuestionDetailsProps) => {
    return ( 
        <Container className="textfield-container my-4">
            <h3>{question.question}</h3>
            <hr className='divider' />
            <p className="my-1 number-responses">{answers?.length} responses</p>
            {answers && answers.map((answer) => (
                    <TextfieldAnswer answer={answer}/>
            ))}
        </Container>
     );
}
 
export default TextfieldQuestionDetails;