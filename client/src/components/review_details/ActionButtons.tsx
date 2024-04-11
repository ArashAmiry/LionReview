import Container from "react-bootstrap/esm/Container";
import { Button, Col, Row } from "react-bootstrap";

function ActionButtons({ reviewStatus, deleteReview, completeReview }: { reviewStatus: string, deleteReview: () => void, completeReview: () => void }) {
    return (
        <Container className="action-container ">
            <Row className="d-flex justify-content-center align-items-center my-2">
                {reviewStatus !== "Completed" && (
                    <>
                        <Col md={3}>
                            <Button className="delete-btn" variant= "dangerdark" onClick={() => deleteReview()} >
                                Delete
                            </Button>
                        </Col>
                        <Col md={3}>
                            <Button className="complete-btn" variant="completeform" onClick={() => completeReview()}>Complete review </Button>
                        </Col>
                    </>
                )}
                {reviewStatus === "Completed" && (
                    <>
                        <Col md={7}>
                            <Button className="delete-btn" onClick={() => deleteReview()} variant="danger">
                                Delete
                            </Button>
                        </Col>
                    </>)
                }
            </Row>
        </Container>
    )
}

export default ActionButtons;