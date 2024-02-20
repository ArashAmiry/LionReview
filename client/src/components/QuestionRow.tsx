import { ChangeEvent } from 'react';
import { Form, Container, Row, Col, Image, Button, CloseButton } from 'react-bootstrap';


function QuestionRow({question, index, handleChangeQuestion, deleteQuestion} : {question: string, index: number, handleChangeQuestion: (e: ChangeEvent, index: number) => void, deleteQuestion: (index: number) => void}) {
    
    return (
        <Form.Group key={index} className='step-row py-3'>
            <Row>
                <Col xs={10}>
                    <Form.Control name="desc" type="text" placeholder={`Write a question here...`} value={question} aria-required="true" onChange={(e) => handleChangeQuestion(e, index)} />
                </Col>
                <Col xs={2}>
                    <CloseButton className="pt-3" onClick={() => deleteQuestion(index)} />
                </Col>
            </Row>
        </Form.Group>
    )
}

export default QuestionRow;