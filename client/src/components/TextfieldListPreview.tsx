import { Form } from "react-bootstrap";

function TextfieldListPreview({ textfields }: { textfields: {questionType: string, question: string}[] }) {
    return (
        <>
            {textfields
                .filter(textfield => textfield.question !== "")
                .map((textfield, index) => (
                    <Form.Group key={index} className="mb-3 textfield-group questionBox p-3" controlId={`step-${index}`}>
                        <p>{textfield.question}</p>
                        <Form.Control
                            type="text"
                            defaultValue="Textfield answer..."
                            readOnly // or disabled, depending on your needs
                        />
                    </Form.Group>
                ))}
        </>
    )
}

export default TextfieldListPreview;