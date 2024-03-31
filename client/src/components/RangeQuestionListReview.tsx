import Slider from "@mui/material/Slider/Slider";
import { AnswerPage } from "../pages/RespondentReview";
import Form from "react-bootstrap/esm/Form";

type RangeQuestionListReviewProps = {
    currentPageIndex: number,
    answerPages: AnswerPage[], 
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}

function RangeQuestionListReview({ currentPageIndex, answerPages, setAnswerPages }: RangeQuestionListReviewProps) {
    const maxValue = 5;
    const rangeQuestions = answerPages[currentPageIndex].rangeQuestions;
    
    function valuetext(value: number, max: number) {
        return `${value}/${max}`;
    };
    
    const marks = Array.from({ length: maxValue }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}`
    }));

    const handleSliderChange = (event: Event, answer: number, id: string) => {
        const questionIndex = rangeQuestions.findIndex(q => q.id === id);
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage]; 
            updatedAnswerPage[currentPageIndex].rangeQuestions[questionIndex].answer = answer.toString(); 
            return updatedAnswerPage;
        })
    };

    return (
        <>
            {answerPages[currentPageIndex].rangeQuestions
                .filter(rangeQuestions => rangeQuestions.question !== "")
                .map((rangeQuestion, index) => (
                    <Form.Group key={index} className="mb-3 questionBox p-3" controlId={`step-${index}`}>
                        <p>{rangeQuestion.question}</p>
                        <Slider
                            aria-label="Rating"
                            value={parseInt(rangeQuestion.answer)}
                            getAriaValueText={valuetext}
                            shiftStep={1}
                            step={1}
                            marks={marks}
                            min={1}
                            max={maxValue}
                            onChange={(event, value) => handleSliderChange(event, value as number, rangeQuestion.id)}
                            sx={{
                                '& .MuiSlider-markLabel': {
                                  color: "var(--text-color)",
                                },
                            }}
                        />
                    </Form.Group>
                ))}
        </>
    )
}

export default RangeQuestionListReview;