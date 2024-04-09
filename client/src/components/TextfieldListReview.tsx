import { Form } from "react-bootstrap";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";
import { useEffect, useRef } from "react";

type TextFieldListReviewProps = {
    currentPageIndex: number,
    question: QuestionAnswer,
    questionIndex: number,
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}

function TextfieldListReview({ currentPageIndex, question, questionIndex, setAnswerPages }: TextFieldListReviewProps) {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleTextfieldChange(e.target.value, question.id);
    };
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [question.answer]);
    const handleTextfieldChange = (answer: string, id: string) => {
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage];
            updatedAnswerPage[currentPageIndex].questions[questionIndex].answer = answer;
            return updatedAnswerPage;
        })
    };

    return (
        <Form.Group key={questionIndex} className="mb-3 question textfield-group p-3" controlId={`step-${questionIndex}`}>
            <Form.Label className="textfield-label">{question.question}</Form.Label>
            <Form.Control
                as="textarea"
                ref={textareaRef}
                placeholder="Textfield answer..."
                value={question.answer}
                onChange={handleInputChange}
                style={{ resize: 'none', overflowY: 'hidden' }}
            />
        </Form.Group>
    )
}

export default TextfieldListReview;