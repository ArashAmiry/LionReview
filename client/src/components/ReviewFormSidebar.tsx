import { Button, Card } from "react-bootstrap";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";
import axios from "axios";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";
import RangeQuestionListReview from "./RangeQuestionListReview";

type ReviewFormSideBarProps = {
    currentPageIndex: number,
    setCurrentPageIndex: (index: number) => void,
    answerPages: AnswerPage[],
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>,
    reviewId: string,
    setErrorPage: (isError: boolean) => void;
}

function ReviewFormSidebar({ currentPageIndex, setCurrentPageIndex, answerPages, setAnswerPages, reviewId, setErrorPage }: ReviewFormSideBarProps) {
    const reviewTitle = answerPages[currentPageIndex].formName;

    const handleContinue = () => {
        console.log(currentPageIndex)
        console.log(answerPages.length)
        if(currentPageIndex !== answerPages.length) {
            setCurrentPageIndex(currentPageIndex + 1)
        }
    }

    const submitReview = async () => {
        const reviewAnswers = answerPages.flatMap(answerPage => {
            return [...answerPage.binaryQuestions, ...answerPage.textfieldQuestions, ...answerPage.rangeQuestions].map(question => ({
                "questionId": question.id,
                "answer": question.answer
            }));
        });

        try {
            await axios.post('http://localhost:8080/review/answer', {
                "reviewId": reviewId,
                "answers": reviewAnswers
            }).catch((error: Error) => {
                setErrorPage(true);
                console.log(error);
            });


        } catch (error) {
            console.log("Error occurred when updating database: ", error)
        }
    };


    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionListReview currentPageIndex={currentPageIndex} answerPages={answerPages} setAnswerPages={(e) => setAnswerPages(e)} />
                <TextfieldListReview currentPageIndex={currentPageIndex} answerPages={answerPages} setAnswerPages={(e) => setAnswerPages(e)} />
                <RangeQuestionListReview currentPageIndex={currentPageIndex} answerPages={answerPages} setAnswerPages={(e) => setAnswerPages(e)} />
            </Card.Body>

            {(currentPageIndex + 1) !== answerPages.length && (
                <Button size="lg" variant="light" onClick={handleContinue}>Continue</Button>
            )}
            {<Button onClick={() => submitReview()} size="lg" variant="success">Submit Review</Button>}
        </Card>
    )
}

export default ReviewFormSidebar;

function useState(arg0: boolean): [any, any] {
    throw new Error("Function not implemented.");
}
