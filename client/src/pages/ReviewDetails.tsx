import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./stylesheets/CreateReview.css";
import axios from "axios";
import { IReview } from "../interfaces/IReview";
import { Row } from "react-bootstrap";

type DetailsPage = {
    formName: string;
    codeSegments: {
        filename: string;
        content: string;
    }[];
    questions: {
        _id: string;
        question: string;
    }[];
};

const ReviewDetails = () => {
    const [reviewName, setReviewName] = useState<string>("")
    const [reviewPages, setReviewPages] = useState<DetailsPage[]>()
    const [questionsAnswers, setQuestionsAnswers] = useState<{questionId: string, answers: string[]}[]>()
    const { reviewId } = useParams<{ reviewId: string }>();

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/single/${reviewId}`);
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
                questionsID.forEach(async questionID => {
                    const response = await axios.get(`http://localhost:8080/review/answer/${questionID}`);
                    console.log(response.data)
                });
            }
        };
    
        updateAnswers();
    }, [reviewPages]);

    return (
        <Container fluid className="container-create m-0 p-0 ">
            <h1>{reviewName}</h1>
            <Row>

            </Row>
        </Container>
    );
}

export default ReviewDetails;