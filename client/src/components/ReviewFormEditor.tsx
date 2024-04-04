import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import AddFormQuestions from "./CreateReviewForm";
import PreviewForm from "./PreviewForm";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import { ChangeEvent } from "react";

interface ReviewFormEditorProps {
    currentPageIndex: number;
    pagesData: CreateReviewPage[]; 
    setPagesData: React.Dispatch<React.SetStateAction<CreateReviewPage[]>>;
}
  

function ReviewFormEditor({currentPageIndex, pagesData, setPagesData} : ReviewFormEditorProps) {
   
    const setBinaryQuestions = (questions: { questionType: string; question: string }[]) => {
        setPagesData((prevPageData) => {
          const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
          updatedPageData[currentPageIndex].binaryQuestions = questions; // Update binaryQuestions of the current page
          return updatedPageData; // Return the updated array of page states
        });
      };
    
    const setTextfieldQuestions = (questions: { questionType: string; question: string }[]) => {
        setPagesData((prevPageData) => {
          const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
          updatedPageData[currentPageIndex].textFieldQuestions = questions; // Update textFieldQuestions of the current page
          return updatedPageData; // Return the updated array of page states
        });
      };

    const setRangeQuestions = (questions: { questionType: string; question: string }[]) => {
      setPagesData((prevPageData) => {
        const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
        updatedPageData[currentPageIndex].rangeQuestions = questions; // rangeQuestions of the current page
        return updatedPageData; // Return the updated array of page states
      });
    }

    const handleChangeReviewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPagesData((prevPageData) => {
          const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
          const currentPage = updatedPageData[currentPageIndex]; // Get the current page state
          currentPage.reviewTitle = value; // Update the reviewTitle of the currentPage
          return updatedPageData; // Return the updated page data array
        });
      };

    return (
    <Row className="form-row">
      <Col md={7} className="form-box pt-2">
        <Row className="pb-3">
          <Col md={12}>
            <Form.Control
              name="desc"
              type="text"
              value={pagesData[currentPageIndex].reviewTitle}
              placeholder={`Title of review form...`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeReviewTitle(e)}
            />
          </Col>
        </Row>
        <Row>
          <AddFormQuestions
            questions={pagesData[currentPageIndex].binaryQuestions}
            setQuestions={(questions) => setBinaryQuestions(questions)}
            textfields={pagesData[currentPageIndex].textFieldQuestions}
            setTextfields={(textfields) => setTextfieldQuestions(textfields)}
            rangeQuestions={pagesData[currentPageIndex].rangeQuestions}
            setRangeQuestions={(rangeQuestions) => setRangeQuestions(rangeQuestions)}
          />
        </Row>
      </Col>

      <Col md={5}>
        <PreviewForm
          reviewTitle={pagesData[currentPageIndex].reviewTitle}
          questions={pagesData[currentPageIndex].binaryQuestions}
          textfields={pagesData[currentPageIndex].textFieldQuestions}
          rangeQuestions={pagesData[currentPageIndex].rangeQuestions}
          errorMessage={pagesData[currentPageIndex].formErrorMessage}
        />
      </Col>
    </Row>
  );
}

export default ReviewFormEditor;