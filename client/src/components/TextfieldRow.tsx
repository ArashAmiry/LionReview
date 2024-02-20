import { ChangeEvent } from 'react';
import { Form, Container, Row, Col, Image, Button, CloseButton } from 'react-bootstrap';


function TextfieldRow({textfield, index, handleChangeTextfield, deleteTextfield} : {textfield: string, index: number, handleChangeTextfield: (e: ChangeEvent, index: number) => void, deleteTextfield: (index: number) => void}) {
    
    return (
        <Form.Group key={index} className='step-row py-3'>
            <Row>
                <Col xs={10}>
                    <Form.Control name="desc" type="text" placeholder={`Write a textfield question here...`} value={textfield} aria-required="true" onChange={(e) => handleChangeTextfield(e, index)} />
                </Col>
                <Col xs={2}>
                    <CloseButton className="pt-3" onClick={() => deleteTextfield(index)} />
                </Col>
            </Row>
        </Form.Group>
    )
}

export default TextfieldRow;