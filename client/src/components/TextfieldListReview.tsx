import { Form } from "react-bootstrap";

function TextfieldListReview({ textfields }: { textfields: {id: string, question: string}[] }) {
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
                             // or disabled, depending on your needs
                        />
                    </Form.Group>
                ))}
        </>
    )
}

export default TextfieldListReview;