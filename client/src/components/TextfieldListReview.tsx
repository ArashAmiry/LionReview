import { Form } from "react-bootstrap";

function TextfieldListReview({ textfields }: { textfields: {id: string, question: string, answer: string}[] }) {

    const handleTextfieldChange = (answer: string, id: string) => {
        const textfieldIndex = textfields.findIndex(q => q.id === id);
        textfields[textfieldIndex].answer = answer;
      };

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
                            onChange={(e) => handleTextfieldChange(e.target.value, textfield.id)}
                             // or disabled, depending on your needs
                        />
                    </Form.Group>
                ))}
        </>
    )
}

export default TextfieldListReview;