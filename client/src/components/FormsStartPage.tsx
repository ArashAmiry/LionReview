import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import React, { ReactNode } from 'react';
import './stylesheets/FormsPage.css'

interface FormsPageProps {
    children: ReactNode;
}


const FormsStartPage: React.FC<FormsPageProps> = ({children}) => {
    const formsText = 'Review Forms';
    const tmplText = 'Preset Templates';
    return (
    <Container>
        <Row >
        <Col><p className= 'reviewforms'> {formsText} </p>  </Col>
        <Col> <Button variant="primary" size="lg">
            Create New review
        </Button>{' '}</Col>
        </Row>
        <Row>
        <Col > {children} </Col>
        </Row>
        <Row>
            <p className='preset-templates'> { tmplText}</p>
        </Row>
    </Container>
    );
}

export default FormsStartPage;
export {};