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
                <Card.Title className="binary-question-title">{question.question}</Card.Title>
                <p className="binary-number-responses mt-1 mb-1">{answers?.length} responses</p>
                {answers && <BinaryQuestionStatistics answers={answers} />}
            </Card.Body>
        </Card>
    );
}

export default BinaryQuestionDetailsCard;