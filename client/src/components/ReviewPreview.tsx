import Col from "react-bootstrap/esm/Col";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import CodePreviewPage, { CodeFile } from "./CodePreview";
import Row from "react-bootstrap/esm/Row";
import PreviewFormSidebar from "./PreviewFormSidebar";

type ReviewPreviewProps = {
    pagesData: CreateReviewPage[],
    currentPageIndex: number,
    setPagesData: React.Dispatch<React.SetStateAction<CreateReviewPage[]>>;
    submitReview: () => void,
    addNewPage: () => void,
    setReviewName: (name: string) => void,
    previousStep: () => void
}

function ReviewPreview ({pagesData, currentPageIndex, setPagesData, submitReview, addNewPage, setReviewName, previousStep} : ReviewPreviewProps) {

    const updateCachedFiles = (url: string, fileData: CodeFile) => {
        setPagesData((prevPagesData) => {
          const updatedPagesData = [...prevPagesData]; // Create a copy of the array of page states
          const currentPage = updatedPagesData[currentPageIndex]; // Get the current page state
          const updatedCurrentPage = {
            ...currentPage,
            cachedFiles: { ...currentPage.cachedFiles, [url]: fileData },
          }; // Update the cachedFiles of the current page
          updatedPagesData[currentPageIndex] = updatedCurrentPage; // Update the current page state in the copied array
          return updatedPagesData; // Return the updated array of page states
        });
      };

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
                setReviewName={(name) => setReviewName(name)}
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