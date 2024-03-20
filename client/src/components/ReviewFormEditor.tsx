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
    setBinaryQuestions: (questions: {questionType: string, question: string}[]) => void;
    setTextfieldQuestions: (textfields: {questionType: string, question: string}[]) => void;
    handleChangeReviewTitle: (e: ChangeEvent<HTMLInputElement>) => void;
}
  

function ReviewFormEditor({currentPageIndex, pagesData, setBinaryQuestions, setTextfieldQuestions, handleChangeReviewTitle} : ReviewFormEditorProps) {
  return (
    <Row className="form-row">
      <Col md={7} className="form-box">
        <Row className="pb-3">
          <Col md={12}>
            <Form.Control
              name="desc"
              type="text"
              value={pagesData[currentPageIndex].reviewTitle}
              placeholder={`Title of review form...`}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeReviewTitle(e)
              }
            />
          </Col>
        </Row>
        <Row>
          <AddFormQuestions
            questions={pagesData[currentPageIndex].binaryQuestions}
            setQuestions={(questions) => setBinaryQuestions(questions)}
            textfields={pagesData[currentPageIndex].textFieldQuestions}
            setTextfields={(textfields) => setTextfieldQuestions(textfields)}
          />
        </Row>
      </Col>

      <Col md={5}>
        <PreviewForm
          reviewTitle={pagesData[currentPageIndex].reviewTitle}
          questions={pagesData[currentPageIndex].binaryQuestions}
          textfields={pagesData[currentPageIndex].textFieldQuestions}
          errorMessage={pagesData[currentPageIndex].formErrorMessage}
        />
      </Col>
    </Row>
  );
}

export default ReviewFormEditor;