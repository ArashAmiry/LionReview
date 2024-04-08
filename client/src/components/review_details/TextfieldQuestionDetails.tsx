import { Container } from "react-bootstrap"
import '../stylesheets/review_details/TextfieldQuestionDetails.css'
import TextfieldAnswer from "./TextfieldAnswer";

interface TextfieldQuestionDetailsProps {
    question: { _id: string, question: string };
    answers: string[] | undefined;
}

const TextfieldQuestionDetails = ({ question, answers }:TextfieldQuestionDetailsProps) => {
    return ( 
        <Container className="textfield-container my-4">
            <h5 className="mb-0">{question.question}</h5>
            <p className="mt-1 mb-3">{answers?.filter(item => item !== "").length} responses</p>
            {answers && answers.filter(item => item !== "").map((answer, index) => (
                    <TextfieldAnswer key={index} answer={answer}/>
            ))}
        </Container>
     );
}
 
export default TextfieldQuestionDetails;