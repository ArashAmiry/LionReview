import { Button, Card } from "react-bootstrap";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";
import axios from "axios";
import { AnswerPage } from "../pages/RespondentReview";

function ReviewFormSidebar({ currentPageIndex, setCurrentPageIndex, answerPages, setAnswerPages }: { currentPageIndex : number, setCurrentPageIndex: (index: number) => void, answerPages: AnswerPage[], setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>> }) {
    const reviewTitle = answerPages[currentPageIndex].formName;

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
                {/* <QuestionListReview questions={questions} /> */}
                <TextfieldListReview currentPageIndex={currentPageIndex} answerPages={answerPages} setAnswerPages={(e) => setAnswerPages(e)}/>
            </Card.Body>

            {currentPageIndex !== answerPages.length && (
                <Button size="lg" variant="light" onClick={() => setCurrentPageIndex(currentPageIndex + 1)}>Continue</Button>
            )}
            {/* <Button onClick={() => submitReview(textfields, questions)} size="lg" variant="success">Submit Review</Button> */}
        </Card>
    )
}

export default ReviewFormSidebar;