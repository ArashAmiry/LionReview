import { Button, Card } from "react-bootstrap";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";
import axios from "axios";
import RangeQuestionListReview from "./RangeQuestionListReview";

type ReviewFormSidebarProps = {
    binaryQuestions: { id: string, question: string, answer: string }[],
    textfieldQuestions: { id: string, question: string, answer: string }[],
    rangeQuestions: {id: string, question: string, answer: string}[],
    setRangeQuestions: (rangeQuestions : {id: string, question: string, answer: string}[]) => void
}

function ReviewFormSidebar({ binaryQuestions, textfieldQuestions, rangeQuestions, setRangeQuestions}: ReviewFormSidebarProps) {
    const reviewTitle = "Title";

    const submitReview = async () => {

        binaryQuestions.map(async (question) => {
            try {
                await axios.post('http://localhost:8080/review/answer', {
                    "questionId": question.id,
                    "answer": question.answer
                });
            } catch (error) {
                console.log("Error occured when updating database: ", error)
            }
        })

        textfieldQuestions.map(async (question) => {
            try {
                await axios.post('http://localhost:8080/review/answer', {
                    "questionId": question.id,
                    "answer": question.answer
                });
            } catch (error) {
                console.log("Error occured when updating database: ", error)
            }
        })

        rangeQuestions.map(async (question) => {
            try {
                await axios.post('http://localhost:8080/review/answer', {
                    "questionId": question.id,
                    "answer": question.answer
                });
            } catch (error) {
                console.log("Error occured when updating database: ", error)
            }
        })

        

    }


    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionListReview questions={binaryQuestions} />
                <TextfieldListReview textfields={textfieldQuestions} />
                <RangeQuestionListReview rangeQuestions={rangeQuestions} setRangeQuestions={setRangeQuestions} />
                
            </Card.Body>

            <Button onClick={() => submitReview()} size="lg" variant="success">Submit Review</Button>
        </Card>
    )
}

export default ReviewFormSidebar;