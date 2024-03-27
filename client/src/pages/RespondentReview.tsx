import CodeReview from "../components/CodeReview";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewFormSidebar from "../components/ReviewFormSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { IReview } from "../interfaces/IReview";
import PagesSidebar from "../components/PagesSidebar";
import "./stylesheets/RespondentReview.css";

export interface QuestionAnswer {
    id: string,
    question: string,
    answer: string
}

export interface AnswerPage {
    formName: string,
    binaryQuestions: QuestionAnswer[],
    textfieldQuestions: QuestionAnswer[],
    rangeQuestions: QuestionAnswer[],
    files: {
        name: string,
        content: string
    }[]
}

function RespondentReview() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [review, setReview] = useState<IReview>();
    const [answerPages, setAnswerPages] = useState<AnswerPage[]>([]);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [accessCode, setAccessCode] = useState("");
    const [errorPage, setErrorPage] = useState(false);
    const { reviewId } = useParams<{ reviewId: string }>();

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/single/${reviewId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    const handleAccessSubmit = async () => {
        const res = await axios.get(`http://localhost:8080/access/review`, {
            params: {
                accessCode: accessCode
            }
        });
        setAuthenticated(res.data)
    }

    useEffect(() => {
        fetchReview().then((response) => {
            if (response) {
                setReview(response);

                const newAnswerPages: AnswerPage[] = response.pages.map(page => ({
                    formName: page.formName,
                    binaryQuestions: page.questions
                        .filter(question => question.questionType === 'binary')
                        .map(({ _id, question }) => ({
                            id: _id,
                            question,
                            answer: ''
                        })),
                    textfieldQuestions: page.questions
                        .filter(question => question.questionType === 'text')
                        .map(({ _id, question }) => ({
                            id: _id,
                            question,
                            answer: ''
                        })),
                    rangeQuestions: page.questions
                        .filter(question => question.questionType === 'range')
                        .map(({ _id, question }) => ({
                            id: _id,
                            question,
                            answer: ''
                        })),
                    files: page.codeSegments.map(segment => ({
                        name: segment.filename,
                        content: segment.content
                    }))
                }));

                setAnswerPages(newAnswerPages);
            }
        });
    }, [reviewId]); // This effect runs when `reviewId` changes

    if (typeof reviewId !== 'string' || reviewId.length == 0) {
        return <div>No review ID provided</div>;
    };

    if (!answerPages || !review) {
        return <div>Loading...</div>
    };

    if (!authenticated) {
        return (
            <Container className="access-container d-flex flex-column justify-content-center">
                <Form className="access-form" onSubmit={() => handleAccessSubmit()}>
                    <Form.Group className="access-input">
                        <Form.Control
                            className='mb-3'
                            type="text"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter your access code"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="accessCode-button">
                        Submit Code
                    </Button>
                </Form>
            </Container>
        );
    }
    return (
        <Container fluid className="answer-container px-0">
            <Row className="code-row">
                <Col className="sidebar-col" md={2}>
                    <PagesSidebar pagesTitles={review.pages.map(page => page.formName)} setCurrentPageIndex={(index) => setCurrentPageIndex(index)} />
                </Col>
                <Col className="code-preview" md={9}><CodeReview files={answerPages[currentPageIndex].files} /></Col>
                <Col md={3} className="p-0">
                    <ReviewFormSidebar
                        // pageTitle={review.pages[currentPageIndex].formName}
                        // amountPages={review.pages.length - 1}
                        answerPages={answerPages}
                        setAnswerPages={(e) => setAnswerPages(e)}
                        currentPageIndex={currentPageIndex}
                        setCurrentPageIndex={(index) => setCurrentPageIndex(index)}
                        reviewId={reviewId}
                        setErrorPage={(isError: boolean) => setErrorPage(isError)}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default RespondentReview;