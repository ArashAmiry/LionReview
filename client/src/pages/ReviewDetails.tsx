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
    /*     const [loading, setLoading] = useState(true); */
        const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const [showCode, setShowCode] = useState(false);

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/single/${reviewId}`);
            console.log(response.data)
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
    }, [reviewId]);

    useEffect(() => {
        const updateAnswers = async () => {
            if (reviewPages) {
                const questionsID = reviewPages.flatMap((page) => (
                    page.questions.map((question) => question._id)
                ));
                //console.log(questionsID);
                const responses = await Promise.all(
                    questionsID.map(async (questionID) => {
                        const response = await axios.get(`http://localhost:8080/review/answer/${questionID}`);
                        return { questionId: questionID, answers: response.data }
                    })
                )
                /*
                If questionsAnswers array is defined, update if the questionID is not already in the array
                If questionsAnswers is not defined, a new list is set to that state.
                */
                if (questionsAnswers) {
                    setQuestionsAnswers(questionsAnswers.concat(responses.filter(response => !questionsAnswers.some(answer => answer.questionId === response.questionId))));
                } else {
                    setQuestionsAnswers(responses);
                }
            }
        };

        updateAnswers();
    }, [reviewPages]);

    if (!questionsAnswers || !reviewPages) {
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
                    {reviewPages[currentPageIndex].questions
                        .filter(question => question.questionType === "text")
                        .map((question) => (
                            <TextfieldQuestionDetails
                                question={question}
                                answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                            />
                        ))}
                </Container>
            }
        </Container>
    );
}

export default ReviewDetails;