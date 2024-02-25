import { Form } from "react-bootstrap";

function TextfieldList({ textfields }: { textfields: string[] }) {
    return (
        <>
            {textfields
                .filter(textfield => textfield !== "")
                .map((textfield, index) => (
                    <Form.Group key={index} className="mb-3 textfield-group p-3" controlId={`step-${index}`}>
                        <Form.Label className="textfield-label">{textfield}</Form.Label>
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

export default TextfieldList;