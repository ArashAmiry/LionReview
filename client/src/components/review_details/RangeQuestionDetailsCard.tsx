import { Card, Container } from "react-bootstrap";
import '../stylesheets/review_details/StatisticsDetailsCard.css'
import RangeQuestionStatistics from "./RangeQuestionStatistics";


interface RangeQuestionDetailsCardProps {
    question: { _id: string, question: string };
    answers: string[] | undefined;
}

const RangeQuestionDetailsCard = ({ question, answers }:RangeQuestionDetailsCardProps) => {
    return (
        <Card id={question._id} className='card'>
            <Card.Body className='binary-card justify-content-center'>
                <Card.Title className="two-line-name">{question.question}</Card.Title>
                {answers && <RangeQuestionStatistics answers={answers} />}
            </Card.Body>
        </Card>
    );
}
 
export default RangeQuestionDetailsCard;