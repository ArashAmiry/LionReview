import { FormLabel } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";

function TextfieldListAnswer({ textfieldQuestion, answer }: { textfieldQuestion: string, answer: string }) {

    return (
        <>
            <Form.Group className="mb-3 textfield-group p-3">
                        <Form.Label className="textfield-label">{textfieldQuestion}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Textfield answer..."
                            value={answer}
                        // or disabled, depending on your needs
                        />
                    </Form.Group>
        </>
    )
}

export default TextfieldListAnswer