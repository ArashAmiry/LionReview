import { Button, Card } from "react-bootstrap";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";
import axios, { AxiosError } from "axios";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";
import RangeQuestionListReview from "./RangeQuestionListReview";
import { useNavigate } from "react-router-dom";

type ReviewFormSideBarProps = {
    currentPageIndex: number,
    setCurrentPageIndex: (index: number) => void,
    answerPages: AnswerPage[],
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>,
    reviewId: string,
    setErrorPage: (error: {isError: boolean, message: string, redirect: boolean}) => void;
}

function ReviewFormSidebar({ currentPageIndex, setCurrentPageIndex, answerPages, setAnswerPages, reviewId, setErrorPage }: ReviewFormSideBarProps) {
    const reviewTitle = answerPages[currentPageIndex].formName;
    const questions = answerPages[currentPageIndex].questions;
    const navigate = useNavigate();

    const handleContinue = () => {
        console.log(currentPageIndex)
        console.log(answerPages.length)
        if (currentPageIndex !== answerPages.length) {
            setCurrentPageIndex(currentPageIndex + 1)
        }
    }

    const submitReview = async () => {
        const reviewAnswers = answerPages.flatMap(answerPage => {
            return [...answerPage.questions].map(question => ({
                "questionId": question.id,
                "answer": question.answer
            }));
        });

        console.log(reviewAnswers);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/review/answer`, {
                "reviewId": reviewId,
                "answers": reviewAnswers
            }).then((res) => {
                navigate("/thanks");
            }).catch((error) => {
            
                if (error.response?.status === 400){
                    setErrorPage({ isError: true, message: error.response.data, redirect: false });
                } else {
                    setErrorPage({ isError: true, message: "Internal server error, try again.", redirect: true});
                }
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
                {questions
                    .filter(question => question.question !== "")
                    .map((question, index) => (
                        <>{question.questionType === "binary" &&
                            (<QuestionListReview currentPageIndex={currentPageIndex} question={question} questionIndex={index} setAnswerPages={(e) => setAnswerPages(e)} />)}
                          {question.questionType === "text" && 
                          (<TextfieldListReview currentPageIndex={currentPageIndex} question={question} questionIndex={index} setAnswerPages={(e) => setAnswerPages(e)} />)}  
                          {question.questionType === "range" && 
                          (<RangeQuestionListReview currentPageIndex={currentPageIndex} question={question} questionIndex={index} setAnswerPages={(e) => setAnswerPages(e)} />)}
                        </>

                    ))}
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
