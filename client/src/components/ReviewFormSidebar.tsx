import { Button, Card } from "react-bootstrap";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";
import axios from "axios";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";
import RangeQuestionListReview from "./RangeQuestionListReview";

type ReviewFormSideBarProps = {
    currentPageIndex : number,
    setCurrentPageIndex: (index: number) => void,
    answerPages: AnswerPage[],
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>,
    reviewId: string
}

function ReviewFormSidebar({ currentPageIndex, setCurrentPageIndex, answerPages, setAnswerPages, reviewId}: ReviewFormSideBarProps) {
    const reviewTitle = answerPages[currentPageIndex].formName;

    const submitReview = async () => {
        const reviewAnswers = answerPages.map((answerPage) => {
            const answers: { questionId: string, answer: string }[] = [];

            [answerPage.binaryQuestions, answerPage.textfieldQuestions, answerPage.rangeQuestions].forEach(questionArray => {
                questionArray.forEach(question => {
                    answers.push({ questionId: question.id, answer: question.answer });
                });
            });
      
            return {
              answers: answers
            };
          });
        try {
            await axios.post('http://localhost:8080/review/answer', {
                "reviewId": reviewId,
                "answers": reviewAnswers
            });
        } catch (error) {
            console.log("Error occurred when updating database: ", error)
        }
    };


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