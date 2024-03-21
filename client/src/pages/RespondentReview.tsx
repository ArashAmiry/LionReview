import CodeReview from "../components/CodeReview";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import ReviewFormSidebar from "../components/ReviewFormSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { IReview } from "../interfaces/IReview";

function RespondentReview() {

    const [files, setFiles] = useState<{ name: string, content: string }[] | undefined>(undefined);
    const [binaryQuestions, setBinaryQuestions] = useState<{ id: string, question: string, answer: string }[]>();
    const [textfieldQuestions, setTextfieldQuestions] = useState<{ id: string, question: string, answer: string }[]>();
    const [rangeQuestions, setRangeQuestions] = useState<{id: string, question: string, answer: string}[]>()
    const { reviewId } = useParams<{ reviewId: string }>();

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/single/${reviewId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchReview().then((response) => {
            if (response) {
                setFiles(response.pages[0].codeSegments.map(segment => ({
                    name: segment.filename,
                    content: segment.content
                })));

                setBinaryQuestions(response.pages[0].questions
                    .filter(question => question.questionType === "binary")
                    .map(filteredQuestion => ({
                        id: filteredQuestion._id,
                        question: filteredQuestion.question,
                        answer: ""
                    })));

                setTextfieldQuestions(response.pages[0].questions
                    .filter(question => question.questionType === "text")
                    .map(filteredQuestion => ({
                        id: filteredQuestion._id,
                        question: filteredQuestion.question,
                        answer: ""
                    })));

                setRangeQuestions(response.pages[0].questions
                    .filter(question => question.questionType === "range")
                    .map(filteredQuestion => ({
                        id: filteredQuestion._id,
                        question: filteredQuestion.question,
                        answer: "3"
                })));


    

            }
        });
    }, [reviewId]); // This effect runs when `reviewId` changes

    if (typeof reviewId !== 'string' || reviewId.length == 0) {
        return <div>No review ID provided</div>;
    };

    if (!files || !binaryQuestions || !textfieldQuestions || !rangeQuestions) {
        return <div>Loading...</div>
    };

    return (
        <Container fluid className="px-0">
            <Row className="code-row">
                <Col className="code-preview" md={9}><CodeReview files={files} /></Col>
                <Col md={3} className="p-0">
                    <ReviewFormSidebar binaryQuestions={binaryQuestions} textfieldQuestions={textfieldQuestions} rangeQuestions={rangeQuestions} setRangeQuestions={setRangeQuestions}/>
                </Col>
            </Row>
        </Container>
    );
}

export default RespondentReview;