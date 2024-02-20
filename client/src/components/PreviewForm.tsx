import { Card, Form } from "react-bootstrap";
import './stylesheets/PreviewForm.css';

function PreviewForm({ questions, textfields }: { questions: string[], textfields: string[] }) {


    return (
        <Card className="preview-box">
            <Card.Body className="mx-5 mt-5">
                {questions
                    .filter(question => question !== "")
                    .map((question, index) => (
                        <Form.Check
                            key={index}
                            id={`step-${index}`} // Add a unique id for each checkbox
                            type="checkbox"
                            label={<p>{question}</p>}
                            className="text-start custom-checkbox"
                        />
                    ))}

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
            </Card.Body>
        </Card>
    )
}

export default PreviewForm;