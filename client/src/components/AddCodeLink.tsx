import { Form, Col, Container, Row, Image, Button } from "react-bootstrap";
import './stylesheets/AddCodeLink.css';
import img from '../images/github-logo.png';

interface AddCodeLinkProps {
    urls: string[],
    setUrls: (array : string[]) => void
    triedToSubmit: boolean
    invalidURLExists: boolean
    setInvalidURLExists: (exists: boolean) => void
}

const AddCodeLink = ({urls, setUrls, invalidURLExists, setInvalidURLExists, triedToSubmit}: AddCodeLinkProps) => {
    const addLink = () => {
        setUrls([...urls, ""])
    }

    const setLink = (link: string, index: number) => {
        if (!isValidUrl(link) || new URL(link).hostname !== 'github.com') {
            setInvalidURLExists(true);
        } else {
            setInvalidURLExists(false);
        }
        const list = [...urls];
        list[index] = link;
        setUrls(list);
    }
    const deleteLink = (index: number) => {
        let list = [...urls];
        list.splice(index, 1);
        if (list.length === 0) {
            list = [""];
        }
        setUrls(list);
    }

    const isValidUrl = (urlString: string | URL) => {
      try { 
      	return Boolean(new URL(urlString)); 
      }
      catch(e){ 
      	return false; 
      }
  }

    return (
        <Col className='links-container'>
            <div className="d-flex justify-content-center">
                <h3>Add the link to one or two code files</h3>
            </div>
            {urls.map((url, index) => (
                <LinkRow key={index} githublink={url} setLink={(url) => setLink(url, index)} deleteLink={() => deleteLink(index)} />
            ))}

            {!(urls.length === 2) &&
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="outline-secondary" className="btn-outline-secondary" onClick={() => addLink()}>
                        Add a second file
                    </Button>
                </div>}
            {(triedToSubmit && invalidURLExists) && <p className="error-message">{"Error: At least one invalid URL"}</p>}
        </Col>
    );
}

interface LinkRowProps {
    githublink: string;
    setLink: (link: string) => void;
    deleteLink: () => void;
}

const LinkRow = ({ githublink, setLink, deleteLink }: LinkRowProps) => {
    return (
        <Container className="link-row my-3">
            <Row className="align-items-center">
                <Col sm={1} className="d-flex justify-content-center align-items-center">
                    <Image alt='image of github logo' src={img} width={30} height={30} roundedCircle />
                </Col>
                <Col sm={5} className="d-flex justify-content-center align-items-center">
                    <p className="mb-0">Link to the file in your GitHub repository:</p>
                </Col>
                <Col sm={4} className="d-flex justify-content-center align-items-center">
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
                <Col sm={2} className="d-flex justify-content-center align-items-center">
                    <Button variant="danger" onClick={() => deleteLink()} > Remove</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AddCodeLink;