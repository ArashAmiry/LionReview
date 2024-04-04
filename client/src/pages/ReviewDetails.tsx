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
import QuestionListAnswer from "../components/QuestionListAnswer";
import TextfieldListAnswer from "../components/TextfieldListAnswer";
import RangeQuestionListAnswer from "../components/RangeQuestionListAnswer";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ActionButtons from "../components/review_details/ActionButtons";

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

const ReviewDetails = () => {
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
            <h3 className="review-page">The {showCode ? "code" : "answers"} for "{reviewPages[currentPageIndex].formName}"</h3>
            <Button className="toggle-code-answers m-1" onClick={() => setShowCode(!showCode)}>{showCode ? "Show answers" : "Show code"}</Button>
            {showCode ?
                <>
                    <Container className="container-details mt-2">
                        <CodeDisplay
                            files={reviewPages[currentPageIndex].codeSegments}
                        />
                    </Container>
                    <ActionButtons reviewStatus={reviewStatus} deleteReview={() => deleteReview()} completeReview={() => completeReview()} />
                </>
                :
                <>
                    {isThereQuestionsForThisPage ? (
                        <>
                            <Container className="big-container">
                                <div className="tab-list-container">
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered className="tab-list">
                                                <Tab label="Summary" value="1" />
                                                <Tab label="Individual" value="2" />
                                            </TabList>
                                        </Box>
                                    </TabContext>
                                </div>
                                <TabContext value={value}>
                                    <TabPanel value="1">
                                        <Container className="container-statistics mt-2">
                                            <Row>
                                                {reviewPages[currentPageIndex].questions
                                                    .filter(question => question.questionType === "binary")
                                                    .map((question) => (
                                                        <Col key={question._id} lg={3} className='my-2'>
                                                            <BinaryQuestionDetailsCard
                                                                question={question}
                                                                answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                                                            />
                                                        </Col>
                                                    ))}
                                            </Row>
                                            <Row>
                                                {reviewPages[currentPageIndex].questions
                                                    .filter(question => question.questionType === "range")
                                                    .map((question) => (
                                                        <Col key={question._id} lg={6} className='my-2'>
                                                            <RangeQuestionDetailsCard
                                                                question={question}
                                                                answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                                                            />
                                                        </Col>
                                                    ))}
                                            </Row>
                                            {reviewPages[currentPageIndex].questions
                                                .filter(question => question.questionType === "text")
                                                .map((question) => (
                                                    <TextfieldQuestionDetails
                                                        key={question._id}
                                                        question={question}
                                                        answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                                                    />
                                                ))}
                                        </Container>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Row className="pb-3">
                                            <Col onClick={() => previousIndividual()} className="page-change"><AiFillCaretLeft /></Col>
                                            <Col className="page-change">Individual {currentIndividualAnswer + 1}</Col>
                                            <Col onClick={() => nextIndividual()} className="page-change"><AiFillCaretRight /></Col>
                                        </Row>
                                        {individualAnswers[currentIndividualAnswer].map((a) => (
                                            reviewPages[currentPageIndex].questions
                                                .filter(question => question.questionType === "binary" && question._id === a.questionId)
                                                .map(question => {
                                                    return (
                                                        <QuestionListAnswer
                                                            binaryQuestion={question.question}
                                                            answer={a.answer}
                                                        />
                                                    );
                                                })
                                        ))}
                                        {individualAnswers[currentIndividualAnswer].map((a) => (
                                            reviewPages[currentPageIndex].questions
                                                .filter(question => question.questionType === "text" && question._id === a.questionId)
                                                .map(question => {
                                                    return (
                                                        <TextfieldListAnswer
                                                            textfieldQuestion={question.question}
                                                            answer={a.answer}
                                                        />
                                                    );
                                                })
                                        ))}

                                        {individualAnswers[currentIndividualAnswer].map((a) => (
                                            reviewPages[currentPageIndex].questions
                                                .filter(question => question.questionType === "range" && question._id === a.questionId)
                                                .map(question => {
                                                    return (
                                                        <RangeQuestionListAnswer
                                                            rangeQuestion={question.question}
                                                            answer={a.answer}
                                                        />
                                                    );
                                                })
                                        ))}
                                    </TabPanel>

                                </TabContext>
                            </Container>
                            <ActionButtons reviewStatus={reviewStatus} deleteReview={() => deleteReview()} completeReview={() => completeReview()} />
                        </>
                    ) : (
                        <>
                            <Container style={{ height: "65vh" }} className="d-flex flex-column justify-content-center align-items-center">
                                <h1 className="no-answers">Oh no, there are no answers submitted for this page.</h1>
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