import Col from "react-bootstrap/esm/Col";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import CodePreviewPage, { CodeFile } from "./CodePreview";
import Row from "react-bootstrap/esm/Row";
import PreviewFormSidebar from "./PreviewFormSidebar";

type ReviewPreviewProps = {
    pagesData: CreateReviewPage[],
    currentPageIndex: number,
    submitReview: () => void,
    addNewPage: () => void,
    setReviewName: (name: string) => void,
    previousStep: () => void,
    isDarkMode: boolean,
    setRandomize: (randomize: Boolean) => void,
}

function ReviewPreview ({pagesData, currentPageIndex, submitReview, addNewPage, setReviewName, previousStep, isDarkMode, setRandomize} : ReviewPreviewProps) {

    

    return (
        <Row className="code-row">
            <Col className="code-preview bg-body" md={9}>
            <CodePreviewPage
                files={pagesData[currentPageIndex].files}
                isDarkMode={isDarkMode}
            />
            </Col>
            <Col md={3} className="p-0">
            <PreviewFormSidebar
                submitReview={(e) => submitReview()}
                addNewPage={(e) => addNewPage()}
                setReviewName={(name) => setReviewName(name)}
                reviewTitle={pagesData[currentPageIndex].reviewTitle}
                questions={pagesData[currentPageIndex].questions}
                previousStep={() => previousStep()}
                setRandomize={(randomize: Boolean) => setRandomize(randomize)}
            />
            </Col>
      </Row>
    )
}

export default ReviewPreview;