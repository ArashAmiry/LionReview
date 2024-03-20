import Col from "react-bootstrap/esm/Col";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import CodePreviewPage, { CodeFile } from "./CodePreview";
import Row from "react-bootstrap/esm/Row";
import PreviewFormSidebar from "./PreviewFormSidebar";

type ReviewPreviewProps = {
    pagesData: CreateReviewPage[],
    currentPageIndex: number,
    updateCachedFiles: (url: string, fileData: CodeFile) => void,
    submitReview: () => void,
    addNewPage: () => void,
    previousStep: () => void
}



function ReviewPreview ({pagesData, currentPageIndex, updateCachedFiles, submitReview, addNewPage, previousStep} : ReviewPreviewProps) {
    return (
        <Row className="code-row">
            <Col className="code-preview" md={9}>
            <CodePreviewPage
                urls={pagesData[currentPageIndex].urls}
                cachedFiles={pagesData[currentPageIndex].cachedFiles}
                updateCachedFiles={updateCachedFiles}
            />
            </Col>
            <Col md={3} className="p-0">
            <PreviewFormSidebar
                submitReview={(e) => submitReview()}
                addNewPage={(e) => addNewPage()}
                reviewTitle={pagesData[currentPageIndex].reviewTitle}
                questions={pagesData[currentPageIndex].binaryQuestions}
                textfields={pagesData[currentPageIndex].textFieldQuestions}
                previousStep={() => previousStep()}
            />
            </Col>
      </Row>
    )
}

export default ReviewPreview;