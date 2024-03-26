import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import QuestionListAnswers from "../components/QuestionListAnswers";

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
    const [reviewName, setReviewName] = useState<string>("")
    const [reviewPages, setReviewPages] = useState<DetailsPage[]>()
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

    const fetchIndividualAnswers = async (): Promise<{questionId: string, answer:string}[][] | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/answer/individual/${reviewId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchReview().then((response) => {
            if (response) {
                setReviewName(response.name);
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
                if(response) {
                    setIndividualAnswers(response);
                }
            })
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

    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!questionsAnswers || !reviewPages) {
        console.log("r" + reviewPages)
        console.log("q" + questionsAnswers)
        console.log("i" + isThereQuestionsForThisPage)
        return <div>Loading</div>;
    }

    return (
        <Container fluid className="page-container d-flex flex-column">
            <Col className="sidebar-col" md={2}>
                <PagesSidebar pagesTitles={reviewPages.map(page => page.formName)} setCurrentPageIndex={(index) => setCurrentPageIndex(index)} />
            </Col>
            <h1 className="review-name">{reviewName}</h1>
            <h3 className="review-page">The {showCode ? "code" : "answers"} for "{reviewPages[currentPageIndex].formName}"</h3>
            <Button className="toggle-code-answers m-1" onClick={() => setShowCode(!showCode)}>{showCode ? "Show answers" : "Show code"}</Button>
            {showCode ?
                <Container className="container-details mt-2">
                    <CodeDisplay
                        files={reviewPages[currentPageIndex].codeSegments}
                    />
                </Container>
                :
                <>
                    {isThereQuestionsForThisPage ? (
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
                                    {reviewPages[currentPageIndex].questions
                                        .filter(question => question.questionType === "binary" )
                                        .map(question => {
                                            // Flatten the array of arrays into a single array
                                            const flatAnswers = individualAnswers.flatMap(a => a);
                                            // Find the answer in the flattened array
                                            const answerObject = flatAnswers.find(answer => answer.questionId === question._id);
                                            return (
                                              <QuestionListAnswers
                                                binaryQuestion={question.question}
                                                // Provide the answer or an empty string if not found
                                                answer={answerObject ? answerObject.answer : ""}
                                              />
                                            );
                                          })}
                                </TabPanel>

                            </TabContext>
                        </Container>


                    ) : (
                        <Container style={{ height: "65vh" }} className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="no-answers">Oh no, there are no answers submitted for this page.</h1>
                        </Container>
                    )}
                </>

            }
        </Container >
    );
}

export default ReviewDetails;