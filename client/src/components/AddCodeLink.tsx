import { Form, Col, Container, Row, Image, Button } from "react-bootstrap";
import './stylesheets/AddCodeLink.css';
import img from '../images/github-logo.png';
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";

interface AddCodeLinkProps {
    currentPageIndex: number;
    pagesData: CreateReviewPage[]; 
    setPagesData: React.Dispatch<React.SetStateAction<CreateReviewPage[]>>;
    setTriedToSubmit: (triedToSubmit: boolean) => void;
}

const AddCodeLink = ({currentPageIndex, pagesData, setPagesData, setTriedToSubmit}: AddCodeLinkProps) => {
    const urls = pagesData[currentPageIndex].urls;
    const triedToSubmit = pagesData[currentPageIndex].triedToSubmit;
    const invalidURLExists = pagesData[currentPageIndex].invalidURLExists;

    const setInvalidURLExists = (value: boolean) => {
        setPagesData((prevPageData) => {
          const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
          updatedPageData[currentPageIndex].invalidURLExists = value; // Update invalidURLExists of the current page
          return updatedPageData; // Return the updated array of page states
        });
      };
    
      const setUrls = (urls: string[]) => {
        setPagesData((prevPageData) => {
          const updatedPageData = [...prevPageData];
          updatedPageData[currentPageIndex].urls = urls;
          return updatedPageData;
        });
      };

    const validateUrls = (list : string[]) => {
        let hasInvalidURL = false;
        list.forEach(item => {
            if (!isValidUrl(item)) {
                hasInvalidURL = true;  
                return;
            }
        });
        setInvalidURLExists(hasInvalidURL);
        if (!hasInvalidURL) {
            setTriedToSubmit(false);
        }
    }
    
    const addLink = () => {
        setUrls([...urls, ""]);
        setInvalidURLExists(true);
    }

    const setLink = (link: string, index: number) => {
        const list = [...urls];
        list[index] = link;
        setUrls(list);
        validateUrls(list);
    }
    const deleteLink = (index: number) => {
        let list = [...urls];
        list.splice(index, 1);
        if (list.length === 0) {
            list = [""];
        }
        setUrls(list);
        validateUrls(list);
    }

    const isValidUrl = (urlString: string | URL) => {
      try { 
      	return Boolean(new URL(urlString).hostname === 'github.com'); 
      }
      catch(e){ 
      	return false; 
      }
  }

    return (
        <Col className='links-container d-flex flex-column justify-content-center'>
            {/* <div className="d-flex justify-content-center">
                <h3>Add the link to one or two code files</h3>
            </div> */}
            {urls.map((url, index) => (
                <LinkRow key={index} githublink={url} setLink={(url) => setLink(url, index)} deleteLink={() => deleteLink(index)} />
            ))}

            {!(urls.length === 2) &&
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="orang" className="btn-outline-secondary" onClick={() => addLink()}>
                        Add a second file
                    </Button>
                </div>}
            {(triedToSubmit && invalidURLExists) && <p className="fs-5 fw-bold text-danger">{"Error: Invalid URL"}</p>}
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
                    <Button variant="dangerdark" onClick={() => deleteLink()} > Remove</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AddCodeLink;