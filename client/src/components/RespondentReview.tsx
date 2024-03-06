import CodeReview from "./CodeReview";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import ReviewFormSidebar from "./ReviewFormSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function RespondentReview(){

    const [review, setReview] = useState(null);

    const {reviewId} = useParams<{ reviewId: string }>();

    const fetchReview = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/review/${reviewId}`);
            setReview(response.data);
        } catch (e){
            console.log(e);
        }
        
    }

    useEffect(() => {
        fetchReview();
    }, [reviewId])

    if (typeof reviewId !== 'string' || reviewId.length == 0){
        return <div>No review ID provided</div>;
    }



    return(
        <Container>
            <Row className="code-row">
                    <Col className="code-preview" md={9}><CodeReview reviewId={reviewId}/></Col>
                    <Col md={3} className="p-0">
                        <ReviewFormSidebar reviewId={reviewId}/>
                    </Col>
                </Row>
        </Container>
    )
}

export default RespondentReview;