import { Button, Card } from "react-bootstrap";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";
import axios from "axios";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";
import RangeQuestionListReview from "./RangeQuestionListReview";

function ReviewFormSidebar({ currentPageIndex, setCurrentPageIndex, answerPages, setAnswerPages }: { currentPageIndex : number, setCurrentPageIndex: (index: number) => void, answerPages: AnswerPage[], setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>> }) {
    const reviewTitle = answerPages[currentPageIndex].formName;

    const submitReview = async () => {
        const postAnswer = async (question : QuestionAnswer) => {
            try {
                await axios.post('http://localhost:8080/review/answer', {
                    "questionId": question.id,
                    "answer": question.answer
                });
            } catch (error) {
                console.log("Error occurred when updating database: ", error)
            }
        };
    
        const submitQuestions = async (questions : QuestionAnswer[]) => {
            for (const question of questions) {
                await postAnswer(question);
            }
        };
    
        for (const page of answerPages) {
            submitQuestions([...page.binaryQuestions, ...page.textfieldQuestions, ...page.rangeQuestions]);
        }
    }


    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionListReview currentPageIndex={currentPageIndex} answerPages={answerPages} setAnswerPages={(e) => setAnswerPages(e)}/>
                <TextfieldListReview currentPageIndex={currentPageIndex} answerPages={answerPages} setAnswerPages={(e) => setAnswerPages(e)}/>
                <RangeQuestionListReview currentPageIndex={currentPageIndex} answerPages={answerPages} setAnswerPages={(e) => setAnswerPages(e)}/>
            </Card.Body>

            {currentPageIndex !== answerPages.length && (
                <Button size="lg" variant="light" onClick={() => setCurrentPageIndex(currentPageIndex + 1)}>Continue</Button>
            )}
            {<Button onClick={() => submitReview()} size="lg" variant="success">Submit Review</Button>}
        </Card>
    )
}

export default ReviewFormSidebar;