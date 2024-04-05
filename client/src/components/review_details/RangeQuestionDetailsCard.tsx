import { Card, Container } from "react-bootstrap";
import '../stylesheets/review_details/RangeQuestionDetailsCard.css'
import RangeQuestionStatistics from "./RangeQuestionStatistics";


interface RangeQuestionDetailsCardProps {
    question: { _id: string, question: string };
    answers: string[] | undefined;
}

const RangeQuestionDetailsCard = ({ question, answers }:RangeQuestionDetailsCardProps) => {
    return (
        <Card id={question._id} className='rq-card my-3'>
            <Card.Body className='range-card justify-content-center'>
                <Card.Title className="two-line-name">{question.question}</Card.Title>
                {answers && <RangeQuestionStatistics answers={answers} />}
            </Card.Body>
        </Card>
    );
}
 
export default RangeQuestionDetailsCard;