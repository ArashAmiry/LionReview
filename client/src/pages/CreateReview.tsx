import Container from "react-bootstrap/esm/Container";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import "./stylesheets/CreateReview.css";
import { Row } from "react-bootstrap";
import AddCodeLink from "../components/AddCodeLink";
import axios from "axios";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import ReviewFormEditor from "../components/ReviewFormEditor";
import ReviewPreview from "../components/ReviewPreview";
import CreateReviewWizardButtons from "../components/CreateReviewWizardButtons";
import PagesSidebar from "../components/PagesSidebar";

const initialPagesState: CreateReviewPage[] = [
  {
    currentStep: 1,
    binaryQuestions: [{ questionType: "binary", question: "" }],
    textFieldQuestions: [{ questionType: "text", question: "" }],
    reviewTitle: "",
    urls: [""],
    cachedFiles: {},
    triedToSubmit: false,
    invalidURLExists: true,
    formErrorMessage: "",
  },
];

function CreateReview() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pagesData, setPagesData] = useState<CreateReviewPage[]>(JSON.parse(JSON.stringify(initialPagesState)));
  const amountSteps = 3;
  const navigate = useNavigate();

  const getNonEmptyQuestions = (questions: { questionType: string; question: string }[]) => {
    return questions.filter((question) => question.question.trim() !== "");
  };

  const setTriedToSubmit = (value: boolean) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].triedToSubmit = value;
      return updatedPageData;
    });
  };

  const setFormErrorMessage = (message: string) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].formErrorMessage = message;
      return updatedPageData;
    });
  };

  const setCurrentStep = (step: number) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].currentStep = step; // Update current step of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const nextStep = () => {
    if (pagesData[currentPageIndex].currentStep === 1) {
      setTriedToSubmit(true); // Kom på nytt variabelnamn
      if (pagesData[currentPageIndex].invalidURLExists) {
        return;
      }
    } else if (pagesData[currentPageIndex].currentStep === 2) {
      if (getNonEmptyQuestions([...pagesData[currentPageIndex].binaryQuestions, ...pagesData[currentPageIndex].textFieldQuestions]).length === 0) {
        setFormErrorMessage("At least one question is required to continue.");
        return;
      } else {
        setFormErrorMessage("");
      }
    }
    setCurrentStep(pagesData[currentPageIndex].currentStep + 1);
  };

  const previousStep = () => {
    if (pagesData[currentPageIndex].currentStep === 1) {
      navigate("/");
    }
    setCurrentStep(pagesData[currentPageIndex].currentStep - 1);
  };

  const addNewPage = () => {
    setPagesData((prevPageData) => [...prevPageData, JSON.parse(JSON.stringify(initialPagesState[0]))]);
    setCurrentPageIndex((currentPageIndex) => currentPageIndex + 1);
  };

  const submitReview = async () => {
    const reviewPages = pagesData.map((pageData) => {
      const codeSegments: { filename: string; content: string }[] = [];
      Object.entries(pageData.cachedFiles).forEach((record) => {
        codeSegments.push({
          filename: record[1].name,
          content: record[1].content,
        });
      });

      return {
        formName: pageData.reviewTitle,
        codeSegments: codeSegments,
        questions: [
          ...getNonEmptyQuestions(pageData.binaryQuestions),
          ...getNonEmptyQuestions(pageData.textFieldQuestions),
        ],
      };
    });
    console.log(reviewPages);
    await axios.post("http://localhost:8080/review/", {
      name: "temporaryName",
      createdBy: "username",
      pages: reviewPages,
    });
  };

  return (
    <Container fluid className="container-create m-0 p-0 d-flex flex-column justify-content-center">
      <Row className="mx-0">
        <Col className="sidebar-col" md={2}>
          <PagesSidebar pagesTitles={pagesData.map(pageData => pageData.reviewTitle)} setCurrentPageIndex={(index) => setCurrentPageIndex(index)}/>
        </Col>

        {pagesData[currentPageIndex].currentStep === 1 && (
          <Col md={12} className="first-step">
            <AddCodeLink
               currentPageIndex={currentPageIndex}
               pagesData={pagesData}
               setPagesData={(e) => setPagesData(e)}
               setTriedToSubmit={(e) => setTriedToSubmit(e)}
            />
          </Col>
        )}

        {pagesData[currentPageIndex].currentStep === 2 && (
          <Col md={7} className="second-step">
            <ReviewFormEditor
              currentPageIndex={currentPageIndex}
              pagesData={pagesData}
              setPagesData={(e) => setPagesData(e)}
            />
          </Col>
        )}

        {pagesData[currentPageIndex].currentStep === 3 && (
          <Col md={12} className="px-0">
            <ReviewPreview 
            pagesData={pagesData} 
            currentPageIndex={currentPageIndex} 
            setPagesData={(e) => setPagesData(e)}
            submitReview={() => submitReview()}
            addNewPage={() => addNewPage()}
            previousStep={() => previousStep()}
            />
          </Col>
        )}

        {pagesData[currentPageIndex].currentStep !== 3 && (
          <Row className="first-step">
           <CreateReviewWizardButtons 
            pagesData={pagesData}
            currentPageIndex={currentPageIndex}
            amountSteps={amountSteps}
            previousStep={() => previousStep()}
            nextStep={() => nextStep()}
           />
          </Row>
        )}
      </Row>
    </Container>
  );
}

export default CreateReview;