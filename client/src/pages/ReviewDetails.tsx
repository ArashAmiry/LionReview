import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./stylesheets/ReviewDetails.css";
import axios from "axios";
import { IReview } from "../interfaces/IReview";
import { Button, Col, Row } from "react-bootstrap";
import BinaryQuestionDetailsCard from "../components/review_details/BinaryQuestionDetailsCard";
import TextfieldQuestionDetails from "../components/review_details/TextfieldQuestionDetails";
import CodeDisplay from "../components/review_details/CodeDisplay";
import PagesSidebar from "../components/PagesSidebar";
import RangeQuestionDetailsCard from "../components/review_details/RangeQuestionDetailsCard";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import QuestionListAnswer from "../components/review_details/QuestionListAnswer";
import TextfieldListAnswer from "../components/review_details/TextfieldListAnswer";
import RangeQuestionListAnswer from "../components/review_details/RangeQuestionListAnswer";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ActionButtons from "../components/review_details/ActionButtons";
import { inherits } from "util";

type DetailsPage = {
    formName: string;
    codeSegments: {
        name: string;
        content: string;
    }[];
    questions: {
        _id: string;
        question: string;
        questionType: string;
    }[];
};

const ReviewDetails = ({isDarkMode} : {isDarkMode: boolean}) => {
    const navigate = useNavigate();
    const [reviewName, setReviewName] = useState<string>("")
    const [reviewPages, setReviewPages] = useState<DetailsPage[]>()
    const [reviewStatus, setReviewStatus] = useState("");
    const [questionsAnswers, setQuestionsAnswers] = useState<{ questionId: string, answers: string[] }[]>()
    const { reviewId } = useParams<{ reviewId: string }>();
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const [isThereQuestionsForThisPage, setIsThereQuestionsForThisPage] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [individualAnswers, setIndividualAnswers] = useState<{ questionId: string, answer: string }[][]>([[]]);
    const [currentIndividualAnswer, setCurrentIndividualAnswer] = useState(0)

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/single/${reviewId}`);
            console.log(response.data)
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    const fetchIndividualAnswers = async (): Promise<{ questionId: string, answer: string }[][] | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/answer/individual/${reviewId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    const previousIndividual = () => {
        if (currentIndividualAnswer !== 0) {
            setCurrentIndividualAnswer(currentIndividualAnswer - 1);
        }

    }

    const nextIndividual = () => {
        if (currentIndividualAnswer !== individualAnswers.length - 1) {
            setCurrentIndividualAnswer(currentIndividualAnswer + 1);
        }
    }

    useEffect(() => {
        fetchReview().then((response) => {
            if (response) {
                setReviewName(response.name);
                setReviewStatus(response.status);
                setReviewPages(response.pages.map((page) => ({
                    codeSegments: page.codeSegments.map((file) => ({
                        name: file.filename,
                        content: file.content
                    })),
                    formName: page.formName,
                    questions: page.questions
                })));
            }
        });

        fetchIndividualAnswers()
            .then((response) => {
                if (response) {
                    setIndividualAnswers(response);
                }
            });
    }, [reviewId]);

    useEffect(() => {
        const updateAnswers = async () => {
            if (reviewPages) {
                const questionsID = reviewPages.flatMap((page) => (
                    page.questions.map((question) => question._id)
                ));
                try {
                    const responses = await Promise.all(
                        questionsID.map(async (questionID) => {
                            try {
                                const response = await axios.get(`http://localhost:8080/review/answer/${questionID}`);
                                console.log("ska int efinnas något här: " + response.data.length);
                                return { questionId: questionID, answers: response.data };
                            } catch (error) {
                                console.error(`Error fetching answers for question ${questionID}:`, error);
                                return { questionId: questionID, answers: undefined }; // Return empty answers if an error occurs
                            }
                        })
                    );

                    if (questionsAnswers) {
                        console.log("svarrrrr: " + questionsAnswers);
                        setQuestionsAnswers(questionsAnswers.concat(responses.filter(response => !questionsAnswers.some(answer => answer.questionId === response.questionId))));
                    } else {
                        setQuestionsAnswers(responses);
                    }
                } catch (error) {
                    console.error("Error fetching answers:", error);
                }
            }
        };

        updateAnswers();
    }, [reviewPages]);

    useEffect(() => {
        if (reviewPages && questionsAnswers) {
            setIsThereQuestionsForThisPage(
                reviewPages[currentPageIndex].questions.some(question =>
                    questionsAnswers.some(answer => answer.questionId === question._id && answer.answers !== undefined)
                )
            );
        }
    }, [currentPageIndex, reviewPages, questionsAnswers]);

    useEffect(() => {

    })

    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!questionsAnswers || !reviewPages) {
        return <div>Loading</div>;
    }

    const completeReview = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/review/${reviewId}`);

            if (response.status === 200) {
                navigate("/myReviews");
            }
            else {
                console.log("Didnt work");
            }
        } catch (e) {
            console.log(e);
        }

    }

    const deleteReview = async () => {
        await axios.delete<Boolean>(`http://localhost:8080/review/${reviewId}`)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {

                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log("error: " + error);
            });

        navigate("/myReviews");
    }

    return (
        <Container fluid className="page-container d-flex flex-column">
            <Col className="sidebar-col" md={2}>
                <PagesSidebar pagesTitles={reviewPages.map(page => page.formName)} currentPageIndex={currentPageIndex} setCurrentPageIndex={(index) => setCurrentPageIndex(index)} />
            </Col>
            <h1 className="review-name">{reviewName}</h1>
            <Button className="toggle-code-answers m-1" variant="lightblue" onClick={() => setShowCode(!showCode)} >{showCode ? "Show answers" : "Show code"}</Button>
            {showCode ?
                <>
                    <Container className="container-details mt-2">
                        <CodeDisplay
                            files={reviewPages[currentPageIndex].codeSegments}
                            isDarkMode={isDarkMode}
                        />
                    </Container>
                    <ActionButtons reviewStatus={reviewStatus} deleteReview={() => deleteReview()} completeReview={() => completeReview()} />
                </>
                :
                <>
                    {isThereQuestionsForThisPage ? (
                        <>
                            <Container className="big-container bg-body">
                                <div className="tab-list-container bg-body">
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered className="tab-list">
                                                <Tab label="Summary" value="1" style={{fontFamily: "Lexend" }} sx={{ color: 'var(--text-color)' }}/>
                                                <Tab label="Individual" value="2" style={{fontFamily: "Lexend" }} sx={{ color: 'var(--text-color)' }}/>
                                            </TabList>
                                        </Box>
                                    </TabContext>
                                </div>
                                <TabContext value={value}>
                                    <TabPanel value="1">
                                        <Container className="container-statistics mt-2 bg-body">
                                            {reviewPages[currentPageIndex].questions
                                                .map((question) => (
                                                    <Row>
                                                        {question.questionType === "binary" && (
                                                            <BinaryQuestionDetailsCard
                                                                question={question}
                                                                answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                                                            />)
                                                        }
                                                        {question.questionType === "text" && (
                                                            <TextfieldQuestionDetails
                                                                key={question._id}
                                                                question={question}
                                                                answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                                                            />)
                                                        }
                                                        {question.questionType === "range" && (
                                                            <RangeQuestionDetailsCard
                                                                question={question}
                                                                answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                                                            />)
                                                        }
                                                    </Row>
                                                ))}
                                        </Container>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Container className="d-flex flex-column align-items-center">
                                            <Row className="buttons-row mb-3">
                                                <Col md={2} onClick={() => previousIndividual()} className="d-flex justify-content-center align-items-center">
                                                    <Button
                                                        onClick={() => {
                                                            previousIndividual();
                                                        }}
                                                        className={`page-change ${currentIndividualAnswer === 0
                                                            ? 'page-change-disabled'
                                                            : 'page-change-enabled'
                                                            }`}
                                                        disabled={currentIndividualAnswer === 0}
                                                    >
                                                        <AiFillCaretLeft />
                                                    </Button>
                                                </Col>
                                                <Col md={8} className="d-flex justify-content-center align-items-center">
                                                    Response {currentIndividualAnswer + 1}
                                                </Col>
                                                <Col md={2} onClick={() => nextIndividual()} className="d-flex justify-content-center align-items-center">
                                                    <Button
                                                        onClick={() => {
                                                            nextIndividual();
                                                        }}
                                                        className={`page-change ${currentIndividualAnswer === individualAnswers.length - 1
                                                            ? 'page-change-disabled'
                                                            : 'page-change-enabled'
                                                            }`}
                                                        disabled={currentIndividualAnswer === individualAnswers.length - 1}
                                                    >
                                                        <AiFillCaretRight />
                                                    </Button>
                                                </Col>
                                            </Row>

                                            {individualAnswers[currentIndividualAnswer].map((a) => (
                                                reviewPages[currentPageIndex].questions
                                                    .filter(question => question._id === a.questionId)
                                                    .map(question => (
                                                        <>
                                                            {question.questionType === "binary" && (
                                                                <QuestionListAnswer
                                                                    binaryQuestion={question.question}
                                                                    answer={a.answer}
                                                                />
                                                            )}
                                                            {question.questionType === "text" && (
                                                                <TextfieldListAnswer
                                                                    textfieldQuestion={question.question}
                                                                    answer={a.answer}
                                                                />
                                                            )}
                                                            {question.questionType === "range" && (
                                                                <RangeQuestionListAnswer
                                                                    rangeQuestion={question.question}
                                                                    answer={a.answer}
                                                                />
                                                            )}
                                                        </>
                                                    ))
                                            ))}
                                        </Container>
                                    </TabPanel>

                                </TabContext>
                            </Container>
                            <ActionButtons reviewStatus={reviewStatus} deleteReview={() => deleteReview()} completeReview={() => completeReview()} />
                        </>
                    ) : (
                        <>
                            <Container style={{ height: "65vh" }} className="d-flex flex-column justify-content-center align-items-center">
                                <h2 className="no-answers">Oh no, there are no answers submitted for this page.</h2>
                            </Container>
                            <ActionButtons reviewStatus={reviewStatus} deleteReview={() => deleteReview()} completeReview={() => completeReview()} />
                        </>
                    )}
                </>

            }
        </Container >
    );
}

export default ReviewDetails;