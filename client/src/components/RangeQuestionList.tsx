import Slider from "@mui/material/Slider/Slider";
import { Col, Container, Form, Row } from "react-bootstrap";

function RangeQuestionListPreview({ rangeQuestions }: { rangeQuestions: {questionType: string, question: string}[] }) {
    const maxValue = 5;
    
    function valuetext(value: number, max: number) {
        return `${value}/${max}`;
    }
    
    const marks = Array.from({ length: maxValue }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}`
    }));

    return (
        <>
            {rangeQuestions
                .filter(rangeQuestions => rangeQuestions.question !== "")
                .map((rangeQuestions, index) => (
                    <Form.Group key={index} className="mb-3 questionBox p-3" controlId={`step-${index}`}>
                        <Container>
                            <Row>
                                <Col>
                                    <p>{rangeQuestions.question}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Slider
                                        aria-label="Rating"
                                        defaultValue={3}
                                        getAriaValueText={valuetext}
                                        shiftStep={1}
                                        step={1}
                                        marks={marks}
                                        min={1}
                                        max={maxValue}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                ))}
        </>
    )
}

export default RangeQuestionListPreview;