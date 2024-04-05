import Slider from "@mui/material/Slider/Slider";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";
import Form from "react-bootstrap/esm/Form";

type RangeQuestionListReviewProps = {
    currentPageIndex: number,
    question: QuestionAnswer,
    questionIndex: number,
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}

function RangeQuestionListReview({ currentPageIndex, question, questionIndex, setAnswerPages }: RangeQuestionListReviewProps) {
    const maxValue = 5;
    //const rangeQuestions = answerPages[currentPageIndex].rangeQuestions;

    function valuetext(value: number, max: number) {
        return `${value}/${max}`;
    };

    const marks = Array.from({ length: maxValue }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}`
    }));

    const handleSliderChange = (event: Event, answer: number, id: string) => {
        //const questionIndex = rangeQuestions.findIndex(q => q.id === id);
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage];
            updatedAnswerPage[currentPageIndex].questions[questionIndex].answer = answer.toString();
            return updatedAnswerPage;
        })
    };
    return (
        <Form.Group key={questionIndex} className="mb-3 question p-3" controlId={`step-${questionIndex}`}>
            <Form.Label>{question.question}</Form.Label>
            <Slider
                aria-label="Rating"
                value={parseInt(question.answer)}
                getAriaValueText={valuetext}
                shiftStep={1}
                step={1}
                marks={marks}
                min={1}
                max={maxValue}
                onChange={(event, value) => handleSliderChange(event, value as number, question.id)} // Why is type number | number[] ?
            />
        </Form.Group>
    )
}

export default RangeQuestionListReview;