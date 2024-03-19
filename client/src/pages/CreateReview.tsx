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

type CreateReviewPage = {
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

const initialPagesState: CreateReviewPage[] = [
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
  const [pagesData, setPagesData] = useState<CreateReviewPage[]>(initialPagesState);
  const amountSteps = 3;
  const navigate = useNavigate();

  const updateCachedFiles = (url: string, fileData: CodeFile) => { ///////////////////////////////////////////////////////////////
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

  const getNonEmptyQuestions = (
    questions: { questionType: string; question: string }[]
  ) => {
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

  const getCurrentStep = () => {
    return pagesData[currentPageIndex].currentStep;
  }

  const nextStep = () => {
    if (pagesData[currentPageIndex].currentStep === 1) {
      setTriedToSubmit(true);
      if (pagesData[currentPageIndex].invalidURLExists) {
        return;
      }
    } else if (pagesData[currentPageIndex].currentStep === 2) {
      if (
        getNonEmptyQuestions([
          ...pagesData[currentPageIndex].binaryQuestions,
          ...pagesData[currentPageIndex].textFieldQuestions,
        ]).length === 0
      ) {
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

  const handleChangeReviewTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      const currentPage = updatedPageData[currentPageIndex]; // Get the current page state
      currentPage.reviewTitle = value; // Update the reviewTitle of the currentPage
      return updatedPageData; // Return the updated page data array
    });
  };

  const setBinaryQuestions = (
    questions: { questionType: string; question: string }[]
  ) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].binaryQuestions = questions; // Update binaryQuestions of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const setTextfieldQuestions = (
    questions: { questionType: string; question: string }[]
  ) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].textFieldQuestions = questions; // Update textFieldQuestions of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const setInvalidURLExists = (value: boolean) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].invalidURLExists = value; // Update invalidURLExists of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const setUrls = (urls: string[]) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].urls = urls;
      return updatedPageData;
    });
  };

  const addNewPage = () => {
    setPagesData((prevPageData) => [
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
              {!collapsed && pagesData.map((page, index) => {

                return <MenuItem onClick={() => {
                  setCurrentPageIndex(index);
                }}> {page.reviewTitle} </MenuItem>
              })}
            </Menu>
          </Sidebar>;
        </Col>

        {pagesData[currentPageIndex].currentStep === 1 && (
          <Col md={12} className="first-step">
            <AddCodeLink
              urls={pagesData[currentPageIndex].urls}
              setUrls={(urls: string[]) => setUrls(urls)}
              setInvalidURLExists={setInvalidURLExists}
              triedToSubmit={pagesData[currentPageIndex].triedToSubmit}
              invalidURLExists={pagesData[currentPageIndex].invalidURLExists}
            />
          </Col>
        )}
      
      {pagesData[currentPageIndex].currentStep === 2 && (
        <Col className="second-step">
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
              <CreateReviewForm
                questions={pagesData[currentPageIndex].binaryQuestions}
                setQuestions={(questions) =>
                  setBinaryQuestions(questions)
                }
                textfields={pagesData[currentPageIndex].textFieldQuestions}
                setTextfields={(textfields) =>
                  setTextfieldQuestions(textfields)
                }
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
        </Col>
      )}

      {pagesData[currentPageIndex].currentStep === 3 && (
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
      )}
      
      {pagesData[currentPageIndex].currentStep !== 3 && (
        <Row className="first-step">
          <Col
            md={4}
            id="navButtons"
            className="my-4 d-flex justify-content-start px-0"
          >
            {pagesData[currentPageIndex].currentStep === 1 && (
              <Button
                size="lg"
                variant="danger"
                onClick={() => previousStep()}
              >
                Exit
              </Button>
            )}
            {pagesData[currentPageIndex].currentStep !== 1 && (
              <Button
                size="lg"
                variant="light"
                onClick={() => previousStep()}
              >
                Back
              </Button>
            )}

            {pagesData[currentPageIndex].currentStep !== amountSteps && (
              <Button size="lg" variant="light" onClick={() => nextStep()}>
                Continue
              </Button>
            )}
          </Col>
        </Row>
      )}
      </Row>
    </Container>
  );
}

export default CreateReview;
