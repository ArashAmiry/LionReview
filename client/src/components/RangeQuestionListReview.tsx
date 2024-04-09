import Slider from "@mui/material/Slider/Slider";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";
import Form from "react-bootstrap/esm/Form";
import { ChangeEvent, useEffect, useState } from "react";

type RangeQuestionListReviewProps = {
    currentPageIndex: number,
    question: QuestionAnswer,
    questionIndex: number,
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}

function RangeQuestionListReview({ currentPageIndex, question, questionIndex, setAnswerPages }: RangeQuestionListReviewProps) {
    const maxValue = 5;
    const [isChecked, setIsChecked] = useState(false);
    const [slideValue, setSlideValue] = useState(1);
    //const rangeQuestions = answerPages[currentPageIndex].rangeQuestions;

    useEffect(() => {
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage];
            updatedAnswerPage[currentPageIndex].questions[questionIndex].answer = slideValue.toString();
            return updatedAnswerPage;
        })
    }, [])

    function valuetext(value: number, max: number) {
        return `${value}/${max}`;
    };

    const marks = Array.from({ length: maxValue }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}`
    }));

    const handleSliderChangeCheckbox = () => {
        const check = !isChecked;
        setIsChecked(check);

        if(check){
            setSlideValue(1);
            setAnswerPages((prevAnswerPage) => {
                const updatedAnswerPage = [...prevAnswerPage];
                updatedAnswerPage[currentPageIndex].questions[questionIndex].answer = "Don't know";
                return updatedAnswerPage;
            })
        }
    }

    const handleSliderChange = (answer: number) => {
        setSlideValue(answer);
        //const questionIndex = rangeQuestions.findIndex(q => q.id === id);
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage];
            updatedAnswerPage[currentPageIndex].questions[questionIndex].answer = answer.toString();
            return updatedAnswerPage;
        })
    };
    return (
        <Form.Group key={questionIndex} className="mb-3 question p-3" controlId={`step-${questionIndex}`}>
            <Form.Label className="range-label">{question.question}</Form.Label>
            <Slider
                aria-label="Rating"
                value={slideValue}
                getAriaValueText={valuetext}
                shiftStep={1}
                step={1}
                marks={marks}
                min={1}
                max={maxValue}
                onChange={(event, value) => handleSliderChange(value as number)} // Why is type number | number[] ?
                disabled={isChecked}
            />
            <Form.Check
                checked={isChecked}
                className="clear-checkbox"
                type="checkbox"
                label={`Don't know`}
                onChange={() => handleSliderChangeCheckbox()}
                
            />
        </Form.Group>
    )
}

export default RangeQuestionListReview;