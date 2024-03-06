import CodeReview from "./CodeReview";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import ReviewFormSidebar from "./ReviewFormSidebar";

function RespondentReview(){

    const {reviewId} = useParams<{ reviewId: string }>();

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