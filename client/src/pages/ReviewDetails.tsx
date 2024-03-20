import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./stylesheets/ReviewDetails.css";
import axios from "axios";
import { IReview } from "../interfaces/IReview";
import { Col, Row } from "react-bootstrap";
import BinaryQuestionDetailsCard from "../components/BinaryQuestionDetailsCard";
import TextfieldQuestionDetails from "../components/TextfieldQuestionDetails";

type DetailsPage = {
    formName: string;
    codeSegments: {
        filename: string;
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
/*     const [loading, setLoading] = useState(true);
    const [currentPageIndex, setCurrentPageIndex] = useState(0) */

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
                    codeSegments: page.codeSegments,
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

    /* useEffect(() => {
        if (questionsAnswers !== undefined && questionsAnswers.length !== 0)
            setLoading(false);
    }, [questionsAnswers]); */

    if (!questionsAnswers) {
        return <div>Loading</div>;
    }

    return (
        <Container fluid className="container-details d-flex flex-column justify-content-center">
            <h1>{reviewName}</h1>
            <Row>
                {reviewPages && reviewPages[0].questions
                .filter(question => question.questionType === "binary")
                .map((question) => (
                    <Col key={question._id} xl={3} className='mt-4 px-4'>
                        <BinaryQuestionDetailsCard
                            question={question}
                            answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                        />
                    </Col>
                ))}
                
            </Row>
            {reviewPages && reviewPages[0].questions
                .filter(question => question.questionType === "text")
                .map((question) => (
                        <TextfieldQuestionDetails
                            question={question}
                            answers={questionsAnswers.find(q => q.questionId === question._id)?.answers}
                        />
                ))}
        </Container>
    );
}

export default ReviewDetails;