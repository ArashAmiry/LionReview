import CreateReviewForm from "../components/CreateReviewForm";
import Container from "react-bootstrap/esm/Container";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import "./stylesheets/CreateReview.css";
import PreviewForm from "../components/PreviewForm";
import { Form, Row } from "react-bootstrap";
import AddCodeLink from "../components/AddCodeLink";
import CodePreviewPage from "../components/CodePreview";
import { CodeFile } from "../components/CodePreview";
import axios from "axios";
import PreviewFormSidebar from "../components/PreviewFormSidebar";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

type Page = {
  currentStep: number;
  binaryQuestions: { questionType: string; question: string }[];
  textFieldQuestions: { questionType: string; question: string }[];
  reviewTitle: string;
  urls: string[];
  cachedFiles: Record<string, CodeFile>;
  triedToSubmit: boolean;
  invalidURLExists: boolean;
  formErrorMessage: string;
};

const initialPagesState: Page[] = [
  {
    currentStep: 1,
    binaryQuestions: [{ questionType: "binary", question: "" }],
    textFieldQuestions: [{ questionType: "text", question: "" }],
    reviewTitle: "",
    urls: [""],
    cachedFiles: {},
    triedToSubmit: false,
    invalidURLExists: false,
    formErrorMessage: "",
  },
];

function CreateReview() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageData, setPageData] = useState<Page[]>(initialPagesState);
  const amountSteps = 3;
  const navigate = useNavigate();

  const updateCachedFiles = (url: string, fileData: CodeFile) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      const currentPage = updatedPageData[currentPageIndex]; // Get the current page state
      const updatedCurrentPage = {
        ...currentPage,
        cachedFiles: { ...currentPage.cachedFiles, [url]: fileData },
      }; // Update the cachedFiles of the current page
      updatedPageData[currentPageIndex] = updatedCurrentPage; // Update the current page state in the copied array
      return updatedPageData; // Return the updated array of page states
    });
  };

  const getNonEmptyQuestions = (
    questions: { questionType: string; question: string }[]
  ) => {
    return questions.filter((question) => question.question.trim() !== "");
  };

  const setTriedToSubmit = (value: boolean) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].triedToSubmit = value;
      return updatedPageData;
    });
  };

  const setFormErrorMessage = (message: string) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].formErrorMessage = message;
      return updatedPageData;
    });
  };

  const setCurrentStep = (step: number) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].currentStep = step; // Update current step of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const getCurrentStep = () => {
    return pageData[currentPageIndex].currentStep;
  }

  const nextStep = () => {
    if (pageData[currentPageIndex].currentStep === 1) {
      setTriedToSubmit(true);
      if (pageData[currentPageIndex].invalidURLExists) {
        return;
      }
    } else if (pageData[currentPageIndex].currentStep === 2) {
      if (
        getNonEmptyQuestions([
          ...pageData[currentPageIndex].binaryQuestions,
          ...pageData[currentPageIndex].textFieldQuestions,
        ]).length === 0
      ) {
        setFormErrorMessage("At least one question is required to continue.");
        return;
      } else {
        setFormErrorMessage("");
      }
    }
    setCurrentStep(pageData[currentPageIndex].currentStep + 1);
  };

  const previousStep = () => {
    if (pageData[currentPageIndex].currentStep === 1) {
      navigate("/");
    }
    setCurrentStep(pageData[currentPageIndex].currentStep - 1);
  };

  const handleChangeReviewTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      const currentPage = updatedPageData[currentPageIndex]; // Get the current page state
      currentPage.reviewTitle = value; // Update the reviewTitle of the currentPage
      return updatedPageData; // Return the updated page data array
    });
  };

  const setBinaryQuestions = (
    questions: { questionType: string; question: string }[]
  ) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].binaryQuestions = questions; // Update binaryQuestions of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const setTextfieldQuestions = (
    questions: { questionType: string; question: string }[]
  ) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].textFieldQuestions = questions; // Update textFieldQuestions of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const setInvalidURLExists = (value: boolean) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].invalidURLExists = value; // Update invalidURLExists of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const setUrls = (urls: string[]) => {
    setPageData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].urls = urls;
      return updatedPageData;
    });
  };

  const addNewPage = () => {
    setPageData((prevPageData) => [
      ...prevPageData,
      {
        currentStep: 1,
        binaryQuestions: [{ questionType: "binary", question: "" }],
        textFieldQuestions: [{ questionType: "text", question: "" }],
        reviewTitle: "",
        urls: [""],
        cachedFiles: {},
        triedToSubmit: false,
        invalidURLExists: false,
        formErrorMessage: "",
      },
    ]);
    setCurrentPageIndex(currentPageIndex => currentPageIndex + 1);
  };

  const submitReview = async () => {
    const reviewPages = pageData.map((pageData) => {
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

  const [collapsed, setCollapsed] = useState(false);

  // Function to toggle the collapse state
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Container fluid className="container-create m-0 p-0 d-flex flex-column justify-content-center">
      <Row className="mx-0">
        <Col className="sidebar-col" md={2}>
          <Sidebar className="sidebar" collapsed={collapsed} backgroundColor="rgb(242, 242, 242, 1)">
               <Menu>
              <MenuItem onClick={() => toggleSidebar()} icon={<MenuOutlinedIcon />} className="d-flex justify-content-center align-items-center"></MenuItem>
              {!collapsed && pageData.map((page, index) => {
                
                return <MenuItem onClick={() => {
                  setCurrentPageIndex(index);
                }}> {page.reviewTitle} </MenuItem>
              })}
            </Menu>
          </Sidebar>;
        </Col>

        {pageData[currentPageIndex].currentStep === 1 && (
          <Col md={12} className="first-step">
            <AddCodeLink
              urls={pageData[currentPageIndex].urls}
              setUrls={(urls: string[]) => setUrls(urls)}
              setInvalidURLExists={setInvalidURLExists}
              triedToSubmit={pageData[currentPageIndex].triedToSubmit}
              invalidURLExists={pageData[currentPageIndex].invalidURLExists}
            />
          </Col>
        )}
      </Row>
      {pageData[currentPageIndex].currentStep === 2 && (
        <Row className="second-step">
          <Col md={7} className="form-box px-0">
            <Row className="pb-3">
              <Col md={12}>
                <Form.Control
                  name="desc"
                  type="text"
                  value={pageData[currentPageIndex].reviewTitle}
                  placeholder={`Title of review form...`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeReviewTitle(e)
                  }
                />
              </Col>
            </Row>
            <Row>
              {pageData[currentPageIndex].currentStep === 2 && (
                <CreateReviewForm
                  questions={pageData[currentPageIndex].binaryQuestions}
                  setQuestions={(questions) =>
                    setBinaryQuestions(questions)
                  }
                  textfields={pageData[currentPageIndex].textFieldQuestions}
                  setTextfields={(textfields) =>
                    setTextfieldQuestions(textfields)
                  }
                />
              )}
            </Row>
          </Col>

          <Col md={5}>
            <PreviewForm
              reviewTitle={pageData[currentPageIndex].reviewTitle}
              questions={pageData[currentPageIndex].binaryQuestions}
              textfields={pageData[currentPageIndex].textFieldQuestions}
              errorMessage={pageData[currentPageIndex].formErrorMessage}
            />
          </Col>
        </Row>
      )}

      {pageData[currentPageIndex].currentStep === 3 && (
        <Row className="code-row ">
          <Col className="code-preview" md={9}>
            <CodePreviewPage
              urls={pageData[currentPageIndex].urls}
              cachedFiles={pageData[currentPageIndex].cachedFiles}
              updateCachedFiles={updateCachedFiles}
            />
          </Col>
          <Col md={3} className="p-0">
            <PreviewFormSidebar
              submitReview={(e) => submitReview()}
              addNewPage={(e) => addNewPage()}
              reviewTitle={pageData[currentPageIndex].reviewTitle}
              questions={pageData[currentPageIndex].binaryQuestions}
              textfields={pageData[currentPageIndex].textFieldQuestions}
              previousStep={() => previousStep()}
            />
          </Col>
        </Row>
      )}
      {pageData[currentPageIndex].currentStep !== 3 && (
        <Row className="first-step second-step">
          <Col
            md={4}
            id="navButtons"
            className="my-4 d-flex justify-content-start px-0"
          >
            {pageData[currentPageIndex].currentStep === 1 && (
              <Button
                size="lg"
                variant="danger"
                onClick={() => previousStep()}
              >
                Exit
              </Button>
            )}
            {pageData[currentPageIndex].currentStep !== 1 && (
              <Button
                size="lg"
                variant="light"
                onClick={() => previousStep()}
              >
                Back
              </Button>
            )}

            {pageData[currentPageIndex].currentStep !== amountSteps && (
              <Button size="lg" variant="light" onClick={() => nextStep()}>
                Continue
              </Button>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CreateReview;
