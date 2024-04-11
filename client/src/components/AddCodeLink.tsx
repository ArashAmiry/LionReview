import { Form, Col, Container, Row, Image, Button } from "react-bootstrap";
import './stylesheets/AddCodeLink.css';
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import darkModeImage from '../images/github-mark-white.svg';
import lightModeImage from '../images/github-mark.svg';
import { CodeFile } from "./CodePreview";

interface AddCodeLinkProps {
    currentPageIndex: number;
    pagesData: CreateReviewPage[]; 
    setPagesData: React.Dispatch<React.SetStateAction<CreateReviewPage[]>>;
    setTriedToSubmit: (triedToSubmit: boolean) => void;
    isDarkMode: boolean;
}

const AddCodeLink = ({currentPageIndex, pagesData, setPagesData, setTriedToSubmit, isDarkMode}: AddCodeLinkProps) => {
    const files = pagesData[currentPageIndex].files;
    const triedToSubmit = pagesData[currentPageIndex].triedToSubmit;
    const invalidURLExists = pagesData[currentPageIndex].invalidURLExists;

    
      const setFiles = (files: CodeFile[]) => {
        setPagesData((prevPageData) => {
          const updatedPageData = [...prevPageData];
          updatedPageData[currentPageIndex].files = files;
          return updatedPageData;
        });
      };
    
    const addLink = () => {
        setFiles([...files, {url: "", content: "", name: ""}]);
    }

    const setLink = (link: string, index: number) => {
        const list = [...files];
        list[index].url = link;
        setFiles(list);
    }
    
    const deleteLink = (index: number) => {
        let list = [...files];
        list.splice(index, 1);
        if (list.length === 0) {
            list = [{url: "", content: "", name: ""}];
        }
        setFiles(list);
        pagesData[currentPageIndex].invalidURLExists = false;
    }

    return (
        <Col className='links-container bg-body'>
            {files.map((file, index) => (
                <LinkRow key={index} githublink={file.url} setLink={(url) => setLink(url, index)} deleteLink={() => deleteLink(index)} isDarkMode={isDarkMode} />
            ))}

            {!(files.length === 2) &&
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
    isDarkMode: boolean;
}

const LinkRow = ({ githublink, setLink, deleteLink, isDarkMode}: LinkRowProps) => {
    return (
        <Container className="link-row my-3">
            <Row className="align-items-center">
                <Col xl={1} className="d-flex justify-content-center align-items-center">
                    <Image alt='image of github logo' src={isDarkMode ? darkModeImage : lightModeImage} width={30} height={30} roundedCircle />
                </Col>
                <Col xl={5} className="d-flex justify-content-center align-items-center">
                    <p className="mb-0">Link to the file in your GitHub repository:</p>
                </Col>
                <Col xl={4} className="d-flex justify-content-center align-items-center">
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
                <Col xl={2} className="d-flex justify-content-center align-items-center">
                    <Button variant="dangerdark" onClick={() => deleteLink()} > Remove</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AddCodeLink;