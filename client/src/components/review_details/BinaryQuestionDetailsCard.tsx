import { Card, Container } from "react-bootstrap";
import BinaryQuestionStatistics from "./BinaryQuestionStatistics";
import '../stylesheets/review_details/BinaryQuestionDetailsCard.css'


interface BinaryQuestionDetailsCardProps {
    question: { _id: string, question: string };
    answers: string[] | undefined;
}

const BinaryQuestionDetailsCard = ({ question, answers }:BinaryQuestionDetailsCardProps) => {
    return (
        <Card id={question._id} className='bq-card my-3'>
            <Card.Body className='binary-card justify-content-center'>
                <Card.Title className="two-line-name">{question.question}</Card.Title>
                {answers && <BinaryQuestionStatistics answers={answers} />}
            </Card.Body>
        </Card>
    );
}

export default BinaryQuestionDetailsCard;