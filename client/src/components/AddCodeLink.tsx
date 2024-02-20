import { Form, Col, Container, Row, Image, Button } from "react-bootstrap";
import './stylesheets/AddCodeLink.css';
import img from '../images/github-logo.png';
import { useState } from "react";

const AddCodeLink = () => {
    const [fileUrls, setFileUrls] = useState<string[]>([""])

    const addLink = () => {
        setFileUrls([...fileUrls, ""])
    }

    const setLink = (link: string, index: number) => {
        const list = [...fileUrls];
        list[index] = link;
        setFileUrls(list);
    }
    const deleteLink = (index: number) => {
        const list = [...fileUrls];
        list.splice(index, 1);
        setFileUrls(list);
    }

    return (
        <Container className='links-container'>
            <h3>Add the link</h3>
            {fileUrls.map((url, index) => (
                <LinkRow key={index} githublink={url} setLink={(url) => setLink(url, index)} deleteLink={() => deleteLink(index)}/>
            ))}

            {!(fileUrls.length === 2) && 
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3" onClick={() => addLink()}>
                Add a second file
            </Button>}
        </Container>

    );
}

interface LinkRowProps {
    githublink: string;
    setLink: (link: string) => void;
    deleteLink: () => void;
}

const LinkRow = ({ githublink, setLink, deleteLink }: LinkRowProps) => {
    return (
        <Container className="link-row">
            <Row className="align-items-center">
                <Col sm={1} className="d-flex justify-content-center align-items-center">
                    <Image alt='image of github logo' src={img} width={30} height={30} roundedCircle />
                </Col>
                <Col sm={6} className="d-flex align-items-center">
                    <p className="mb-0">Paste the link to the file in your GitHub repository:</p>
                </Col>
                <Col sm={4} className="d-flex align-items-center">
                    <Form.Control
                        data-testid="name-input"
                        name="link" type="text"
                        placeholder="http://www.github.com/..."
                        value={githublink}
                        aria-required="true"
                        onChange={(e) => {
                            const { value } = e.target;
                            setLink(value);
                        }} />
                </Col>
                <Col sm={1} className="d-flex align-items-center">
                    <Button variant="danger" onClick={() => deleteLink()} > Del</Button>
                </Col>
            </Row>
        </Container>


    )
}

export default AddCodeLink;