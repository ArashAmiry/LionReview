import { Form } from "react-bootstrap";
import { AnswerPage } from "../pages/RespondentReview";

type TextFieldListReviewProps = {
    currentPageIndex: number,
    answerPages: AnswerPage[], 
    setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>>
}



function TextfieldListReview({ currentPageIndex, answerPages, setAnswerPages }: TextFieldListReviewProps) {

    const handleTextfieldChange = (answer: string, id: string) => {
        const textfieldIndex = textfields.findIndex(q => q.id === id);
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage]; 
            updatedAnswerPage[currentPageIndex].textfieldQuestions[textfieldIndex].answer = answer; 
            return updatedAnswerPage;
        })
    };

    const textfields = answerPages[currentPageIndex].textfieldQuestions;

    return (
        <>
            {textfields
                .filter(textfield => textfield.question !== "")
                .map((textfield, index) => (
                    <Form.Group key={index} className="mb-3 questionBox textfield-group p-3" controlId={`step-${index}`}>
                        <p>{textfield.question}</p>
                        <Form.Control
                            type="text"
                            placeholder="Textfield answer..."
                            value={textfield.answer}
                            onChange={(e) => handleTextfieldChange(e.target.value, textfield.id)}
                        // or disabled, depending on your needs
                        />
                    </Form.Group>
                ))}
        </>
    )
}

export default TextfieldListReview;