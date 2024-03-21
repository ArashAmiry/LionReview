import { Form } from "react-bootstrap";
import { AnswerPage } from "../pages/RespondentReview";

function TextfieldListReview({ currentPageIndex, answerPages, setAnswerPages }: { currentPageIndex: number, answerPages: AnswerPage[], setAnswerPages: React.Dispatch<React.SetStateAction<AnswerPage[]>> }) {

    const handleTextfieldChange = (answer: string, id: string) => {
        const textfieldIndex = textfields.findIndex(q => q.id === id);
        setAnswerPages((prevAnswerPage) => {
            const updatedAnswerPage = [...prevAnswerPage]; 
            updatedAnswerPage[currentPageIndex].textfields[textfieldIndex].answer = answer; 
            return updatedAnswerPage;
        })
    };

    const textfields = answerPages[currentPageIndex].textfields;

    return (
        <>
            {textfields
                .filter(textfield => textfield.question !== "")
                .map((textfield, index) => (
                    <Form.Group key={index} className="mb-3 textfield-group p-3" controlId={`step-${index}`}>
                        <Form.Label className="textfield-label">{textfield.question}</Form.Label>
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