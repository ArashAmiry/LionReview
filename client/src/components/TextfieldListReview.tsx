import { Form } from "react-bootstrap";
import { AnswerPage, QuestionAnswer } from "../pages/RespondentReview";

type TextFieldListReviewProps = {
    currentPageIndex: number,
    question: QuestionAnswer,
    questionIndex: number,
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}



function TextfieldListReview({ currentPageIndex, question, questionIndex, setAnswerPages }: TextFieldListReviewProps) {

    const handleTextfieldChange = (answer: string, id: string) => {
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage];
            updatedAnswerPage[currentPageIndex].questions[questionIndex].answer = answer;
            return updatedAnswerPage;
        })
    };

    //const textfields = answerPages[currentPageIndex].textfieldQuestions;

    return (
        <Form.Group key={questionIndex} className="mb-3 question textfield-group p-3" controlId={`step-${questionIndex}`}>
            <Form.Label className="textfield-label">{question.question}</Form.Label>
            <Form.Control
                type="text"
                placeholder="Textfield answer..."
                value={question.answer}
                onChange={(e) => handleTextfieldChange(e.target.value, question.id)}
            // or disabled, depending on your needs
            />
        </Form.Group>
    )
}

export default TextfieldListReview;