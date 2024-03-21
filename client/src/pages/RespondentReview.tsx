import CodeReview from "../components/CodeReview";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import ReviewFormSidebar from "../components/ReviewFormSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { IReview } from "../interfaces/IReview";
import PagesSidebar from "../components/PagesSidebar";
import "./stylesheets/RespondentReview.css";

function RespondentReview() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [review, setReview] = useState<IReview>();

    const [files, setFiles] = useState<{ name: string, content: string }[] | undefined>(undefined);
    const [questions, setQuestions] = useState<{ id: string, question: string, answer: string }[]>();
    const [textfields, setTextfields] = useState<{ id: string, question: string, answer: string }[]>();
    const { reviewId } = useParams<{ reviewId: string }>();

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/single/${reviewId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    const updatePage = (review: IReview) => {
        setFiles(review.pages[currentPageIndex].codeSegments.map(segment => ({
            name: segment.filename,
            content: segment.content
        })));

        setQuestions(review.pages[currentPageIndex].questions
            .filter(question => question.questionType === "binary")
            .map(filteredQuestion => ({
                id: filteredQuestion._id,
                question: filteredQuestion.question,
                answer: ""
            })));

        setTextfields(review.pages[currentPageIndex].questions
            .filter(question => question.questionType === "text")
            .map(filteredQuestion => ({
                id: filteredQuestion._id,
                question: filteredQuestion.question,
                answer: ""
            })))
    }

    useEffect(() => {
        fetchReview().then((response) => {
            if (response) {
                setReview(response);
                updatePage(response);
            }
        });
    }, [reviewId]); // This effect runs when `reviewId` changes

    useEffect(() => {
        if (review) {
            updatePage(review);
        }

    }, [currentPageIndex])

    if (typeof reviewId !== 'string' || reviewId.length == 0) {
        return <div>No review ID provided</div>;
    }

    if (!files || !questions || !textfields || !review) {
        return <div>Loading...</div>
    }

    return (
        <Container fluid className="answer-container px-0">
            <Row className="code-row">
                <Col className="sidebar-col" md={2}>
                    <PagesSidebar pagesTitles={review.pages.map(page => page.formName)} setCurrentPageIndex={(index) => setCurrentPageIndex(index)} />
                </Col>
                <Col className="code-preview" md={9}><CodeReview files={files} /></Col>
                <Col md={3} className="p-0">
                    <ReviewFormSidebar
                        pageTitle={review.pages[currentPageIndex].formName}
                        currentPageIndex={currentPageIndex}
                        amountPages={review.pages.length - 1}
                        textfields={textfields}
                        setTextfields={setTextfields}
                        questions={questions}
                        setCurrentPageIndex={(index) => setCurrentPageIndex(index)}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default RespondentReview;