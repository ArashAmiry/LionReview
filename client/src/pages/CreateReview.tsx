import Container from "react-bootstrap/esm/Container";
import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import "./stylesheets/CreateReview.css";
import { Row } from "react-bootstrap";
import AddCodeLink from "../components/AddCodeLink";
import axios from "axios";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import ReviewFormEditor from "../components/ReviewFormEditor";
import ReviewPreview from "../components/ReviewPreview";
import CreateReviewWizardButtons from "../components/CreateReviewWizardButtons";
import PagesSidebar from "../components/PagesSidebar";


const initialPagesState: CreateReviewPage[] = [
  {
    currentStep: 1,
    questions: [],
    reviewTitle: "Page 1",
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
  const [reviewName, setReviewName] = useState("");
  const [randomize, setRandomize] = useState<Boolean>(false);
  const amountSteps = 3;
  const navigate = useNavigate();

  const getAllNonEmptyQuestions = (index: number) => {
    const currentPage = pagesData[index];
    console.log(currentPage);
    const allQuestions = [...currentPage.questions];
    return allQuestions.filter((question) => question.question.trim() !== "");
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
      if (getAllNonEmptyQuestions(currentPageIndex).length === 0) {
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
    const newPage : CreateReviewPage = JSON.parse(JSON.stringify(initialPagesState[0]));
    newPage.reviewTitle = "Page " + (pagesData.length + 1);
    setPagesData((prevPageData) => [...prevPageData, newPage]);
    setCurrentPageIndex((currentPageIndex) => currentPageIndex + 1);
  };
  
  const submitReview = async () => {
    const reviewPages = pagesData.map((pageData, index) => {
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
        questions: getAllNonEmptyQuestions(index),
      };
    });
    console.log(reviewPages);
    const review = await axios.post("http://localhost:8080/review/", {
      name: reviewName,
      createdBy: "username", // TODO ta bort
      pages: reviewPages,
      status: "InProgress",
      randomize: randomize
    });
    return review.data;
  };

  return (
    <Container fluid className="container-create m-0 p-0 d-flex flex-column justify-content-center">
      <Row className={`mx-0 ${pagesData[currentPageIndex].currentStep === 3 ? 'full-height' : 'not-full-height'}`}>
        <div className="sidebar-col">
          <PagesSidebar pagesTitles={pagesData.map(pageData => pageData.reviewTitle)} currentPageIndex={currentPageIndex} setCurrentPageIndex={(index) => setCurrentPageIndex(index)} currentStep={pagesData[currentPageIndex].currentStep}/>
        </div>

        {pagesData[currentPageIndex].currentStep === 1 && (
          <Col md={12} className="first-step center-add-code first-second-col">
            <AddCodeLink
               currentPageIndex={currentPageIndex}
               pagesData={pagesData}
               setPagesData={(e) => setPagesData(e)}
               setTriedToSubmit={(e) => setTriedToSubmit(e)}
            />
          </Col>
        )}

        {pagesData[currentPageIndex].currentStep === 2 && (
          <Col md={12} className="second-step first-second-col">
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
            setRandomize={(randomize: Boolean) => setRandomize(randomize)}
            addNewPage={() => addNewPage()}
            setReviewName={(name) => setReviewName(name)}
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