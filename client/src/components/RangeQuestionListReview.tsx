import Slider from "@mui/material/Slider/Slider";
import { Form } from "react-bootstrap";

type RangeQuestionListReviewProps = {
    rangeQuestions: {id: string, question: string, answer: string}[],
    setRangeQuestions: (rangeQuestions : {id: string, question: string, answer: string}[]) => void
}

function RangeQuestionListReview({ rangeQuestions, setRangeQuestions }: RangeQuestionListReviewProps) {
    const maxValue = 5;
    
    function valuetext(value: number, max: number) {
        return `${value}/${max}`;
    };
    
    const marks = Array.from({ length: maxValue }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}`
    }));

    const handleSliderChange = (event: Event, value: number, id: string) => {
        const rangeQuestionIndex = rangeQuestions.findIndex(question => question.id === id);
        const newRangeQuestions = [...rangeQuestions];
        newRangeQuestions[rangeQuestionIndex].answer = value.toString();
        setRangeQuestions(newRangeQuestions);
    };

    return (
        <>
            {rangeQuestions
                .filter(rangeQuestions => rangeQuestions.question !== "")
                .map((rangeQuestion, index) => (
                    <Form.Group key={index} className="mb-3 question p-3" controlId={`step-${index}`}>
                        <Form.Label>{rangeQuestion.question}</Form.Label>
                        <Slider
                            aria-label="Rating"
                            value={parseInt(rangeQuestion.answer)}
                            getAriaValueText={valuetext}
                            shiftStep={1}
                            step={1}
                            marks={marks}
                            min={1}
                            max={maxValue}
                            onChange={(event, value) => handleSliderChange(event, value as number, rangeQuestion.id)} // Why is type number | number[] ?
                        />
                    </Form.Group>
                ))}
        </>
    )
}

export default RangeQuestionListReview;