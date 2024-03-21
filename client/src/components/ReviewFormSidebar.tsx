import { Button, Card } from "react-bootstrap";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";
import axios from "axios";

function ReviewFormSidebar({ pageTitle, currentPageIndex, amountPages, textfields, questions, setCurrentPageIndex }: { pageTitle: string, currentPageIndex : number, amountPages : number, textfields: { id: string, question: string, answer: string }[], questions: { id: string, question: string, answer: string }[], setCurrentPageIndex: (index: number) => void }) {
    const reviewTitle = pageTitle;

    const submitReview = async (textfields: { id: string, question: string, answer: string }[], questions: { id: string, question: string, answer: string }[]) => {

        questions.map(async (question) => {
            try {
                await axios.post('http://localhost:8080/review/answer', {
                    "questionId": question.id,
                    "answer": question.answer
                });
            } catch (error) {
                console.log("Error occured when updating database: ", error)
            }
        })

        textfields.map(async (textfield) => {
            try {
                await axios.post('http://localhost:8080/review/answer', {
                    "questionId": textfield.id,
                    "answer": textfield.answer
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
                <QuestionListReview questions={questions} />
                <TextfieldListReview textfields={textfields} />
            </Card.Body>

            {currentPageIndex !== amountPages && (
                <Button size="lg" variant="light" onClick={() => setCurrentPageIndex(currentPageIndex + 1)}>Continue</Button>
            )}
            <Button onClick={() => submitReview(textfields, questions)} size="lg" variant="success">Submit Review</Button>
        </Card>
    )
}

export default ReviewFormSidebar;