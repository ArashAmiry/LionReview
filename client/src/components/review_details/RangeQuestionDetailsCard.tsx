import { Card, Container } from "react-bootstrap";
import '../stylesheets/review_details/RangeQuestionDetailsCard.css'
import RangeQuestionStatistics from "./RangeQuestionStatistics";


interface RangeQuestionDetailsCardProps {
    question: { _id: string, question: string };
    answers: string[] | undefined;
}

const RangeQuestionDetailsCard = ({ question, answers }:RangeQuestionDetailsCardProps) => {
    return (
        <Card id={question._id} className='rq-card my-3 text-left'>
            <Card.Body className='range-card justify-content-center'>
                <Card.Title className="range-question-title mb-0">{question.question}</Card.Title>
                <p className="range-number-responses mt-1 mb-1">{answers?.length} responses</p>

                {answers && <RangeQuestionStatistics answers={answers} />}
            </Card.Body>
        </Card>
    );
}
 
export default RangeQuestionDetailsCard;