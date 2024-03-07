import CodeReview from "./CodeReview";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import ReviewFormSidebar from "./ReviewFormSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { IReview } from "../interfaces/IReview";

function RespondentReview() {

    const [files, setFiles] = useState([{ name: "", content: "" }]);



    const { reviewId } = useParams<{ reviewId: string }>();

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/${reviewId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchReview().then((response) => {
            if (response) {
                console.log(response);
                setFiles(response.review[0].codeSegments.map(segment => ({
                    name: segment.filename,
                    content: segment.content
                })));
                console.log(files);
            }
        });

    }, [reviewId]); // This effect runs when `reviewId` changes

    if (typeof reviewId !== 'string' || reviewId.length == 0) {
        return <div>No review ID provided</div>;
    }

    return (
        <Container fluid className="px-0">
            <Row className="code-row">
                <Col className="code-preview" md={9}><CodeReview files={files} /></Col>
                <Col md={3} className="p-0">
                    <ReviewFormSidebar reviewId={reviewId} />
                </Col>
            </Row>
        </Container>
    )
}

export default RespondentReview;