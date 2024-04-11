import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
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
import useStateCallBack from "../components/UseStateCallBack";
import PagesSidebar from "../components/PagesSidebar";
import { CodeFile } from "../components/CodePreview";


const initialPagesState: CreateReviewPage[] = [
  {
    currentStep: 1,
    questions: [],
    reviewTitle: "Page 1",
    files: [{ url: "", content: "", name: "" }],
    cachedFiles: {},
    triedToSubmit: false,
    invalidURLExists: true,
    formErrorMessage: "",
  },
];

function CreateReview({isDarkMode} : {isDarkMode: boolean}) {
  const [currentPageIndex, setCurrentPageIndex] = useStateCallBack(0);
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

  const validateFiles = () => {
    let isValid = true;
    pagesData[currentPageIndex].files.map((file) => {
      if(!file.name || !file.content) {
        console.log(file)
        isValid = false;
      }
    })
    
    return isValid;
  }

  const nextStep = async () => {
    await fetchAllFiles();
    console.log(pagesData)
    if(!validateFiles()) {
      pagesData[currentPageIndex].invalidURLExists = true;
    } else {
      pagesData[currentPageIndex].invalidURLExists = false;
    }
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
    if (pagesData[currentPageIndex].currentStep === 2) {
      pagesData[currentPageIndex].invalidURLExists = false;
    }
    setCurrentStep(pagesData[currentPageIndex].currentStep - 1);
  };

  const addNewPage = () => {
    const newPage: CreateReviewPage = JSON.parse(JSON.stringify(initialPagesState[0]));
    newPage.reviewTitle = "Page " + (pagesData.length + 1);
    setPagesData((prevPageData) => [...prevPageData, newPage]);
    setCurrentPageIndex((currentPageIndex) => currentPageIndex + 1);
  };

  const extractFileName = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

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

    const fetchCode = async (url: string): Promise<CodeFile> => {
      const cachedFiles = pagesData[currentPageIndex].cachedFiles;
      if (cachedFiles[url]) {
        return cachedFiles[url];
      }
      try {
        const response = await axios.get('http://localhost:8080/fetch', {
          params: {
            path: url
          }
        });
        const newFile: CodeFile = {
          url: url,
          content: response.data,
          name: extractFileName(url)
        };
        updateCachedFiles(url, newFile);
        console.log("kommer vi hit")
        return newFile;
      } catch (error) {
        console.error('Error fetching file content:', error);
        return {
          url: "",
          content: "",
          name: "File not found"
        }
      }
    };

    const fetchAllFiles = async () => {
      const filesPromises = pagesData[currentPageIndex].files.map(file => fetchCode(file.url));
      const fetchedFiles = await Promise.all(filesPromises);
      pagesData[currentPageIndex].files = fetchedFiles;

    };

  const handleDeletePage = (pageIndex: number) => { 
    const updatedPagesData = [...pagesData];
    for (let i = pageIndex + 1; i < pagesData.length; i++) {
      if (updatedPagesData[i].reviewTitle === "Page " + (i+1)) {
        updatedPagesData[i].reviewTitle = "Page " + i;
      }   
    }
    setPagesData(updatedPagesData);

    if (currentPageIndex !== pageIndex && (pageIndex > currentPageIndex)) {
      deletePage(pageIndex);
    } else if (currentPageIndex !== pageIndex && (pageIndex < currentPageIndex)) {
      setCurrentPageIndex(currentPageIndex - 1, () => deletePage(pageIndex));
    } else if (currentPageIndex === pageIndex) {
      if (pageIndex > 0) { 
        if (pagesData.length > 1) { 
          setCurrentPageIndex(pageIndex - 1, () => deletePage(pageIndex));
        } 
      } else if (pageIndex === 0 && pagesData.length > 1) {
          deletePage(pageIndex);
        } else {
          setPagesData(JSON.parse(JSON.stringify(initialPagesState)));
      }
    }
  };

  const deletePage = (pageIndex: number) => {
    setPagesData((prevPagesData) => {
      const updatedPagesData = [...prevPagesData];
      updatedPagesData.splice(pageIndex, 1); 
      return updatedPagesData;
    });
  }

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
          <PagesSidebar pagesTitles={pagesData.map(pageData => pageData.reviewTitle)} currentPageIndex={currentPageIndex} setCurrentPageIndex={(index) => setCurrentPageIndex(index)} isDarkMode={isDarkMode} currentStep={pagesData[currentPageIndex].currentStep} handleDeletePage={(index) => handleDeletePage(index)} />
        </div>

        {pagesData[currentPageIndex].currentStep === 1 && (
          <Col md={12} className="first-step center-add-code">
            <AddCodeLink
              currentPageIndex={currentPageIndex}
              pagesData={pagesData}
              setPagesData={(e) => setPagesData(e)}
              setTriedToSubmit={(e) => setTriedToSubmit(e)}
              isDarkMode={isDarkMode}
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
              submitReview={() => submitReview()}
              setRandomize={(randomize: Boolean) => setRandomize(randomize)}
              addNewPage={() => addNewPage()}
              setReviewName={(name) => setReviewName(name)}
              previousStep={() => previousStep()}
              isDarkMode={isDarkMode}
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