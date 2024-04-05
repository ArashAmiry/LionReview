import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import "./stylesheets/MyReviews.css";
import Card from "react-bootstrap/esm/Card";
import Badge from "react-bootstrap/esm/Badge";
import ToggleButtonGroup from "react-bootstrap/esm/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import axios from "axios";
import { IReview } from "../interfaces/IReview";
import { useNavigate } from "react-router-dom";
import EnterEmails from "../components/EnterEmails";
import { Toast } from 'react-bootstrap';
type Review = {
  name: string;
  status: string;
  created: string;
  id: number;
};

enum ReviewStatusFilter {
  All = "All",
  InProgress = "In Progress",
  Completed = "Completed",
}

const MyReviews = ({ username }: { username: string }) => {
  const [userReviews, setUserReviews] = useState<IReview[]>([]);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [reviewID, setReviewID] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReviewStatusFilter>(
    ReviewStatusFilter.All
  );

  const fetchReviews = async () => {
    const response = await axios.get<IReview[]>(`http://localhost:8080/review`)
      .then(function (response) {
        setUserReviews(response.data);
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log("error: " + error);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [username]);

  const handleChange = (status: ReviewStatusFilter) => {
    setStatusFilter(status);
  }
  const filterReviews = (reviews: IReview[], filter: ReviewStatusFilter): IReview[] => {
    return reviews.filter(review => {
      return filter === ReviewStatusFilter.All || review.status.replace(/\s/g, '') === filter.replace(/\s/g, '');
    })
  }

  const handleShowEmailBox = (review: IReview) => {
    setReviewID(review._id);
    setShowEmail(true);
  }

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowToast = () => {
    setShowConfirmation(true);
  };

  return (
    <Container fluid className="myReviewsContainer mx-0">
      <Row className="first-row">
        <Col className="py-3">
          <h1 className="reviewforms">Review forms </h1>
          <ToggleButtonGroup
            type="radio"
            name="statusGroup"
            value={statusFilter}
            onChange={handleChange}
          >
            {(
              Object.keys(ReviewStatusFilter) as Array<
                keyof typeof ReviewStatusFilter
              >
            ).map((status, index) => (
              <ToggleButton
                variant="light"
                id={"tbg-btn-" + index}
                value={ReviewStatusFilter[status]}
                key={index}
              >
                {ReviewStatusFilter[status]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row>
        <Container className="card-container">
          <Row>
            <ReviewCardList reviews={filterReviews(userReviews, statusFilter)} showEmailBox={(review) => handleShowEmailBox(review)} setReviews={(reviews) => setUserReviews(reviews)}/>
          </Row>
        </Container>
      </Row>
      <EnterEmails reviewID={reviewID} showEmail={showEmail} setShowEmail={(show) => setShowEmail(show)} displayToast={handleShowToast}/>

      {/* Fixed position Toast at the top of screen */}
      <div style={{ position: 'fixed', top: '11vh', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
        <Toast onClose={() => setShowConfirmation(false)} show={showConfirmation} delay={4000} autohide bg="light">
          <Toast.Header>
            <strong className="me-auto">Email sent</strong>
          </Toast.Header>
          <Toast.Body className="text-black">The review has now been sent to the reviewers</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
};

const ReviewCardList = ({ reviews, setReviews, showEmailBox }: { reviews: IReview[], setReviews: (reviews: IReview[]) => void, showEmailBox: (review: IReview) => void }) => {
  const navigate = useNavigate();
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "InProgress":
        return "warning";
      case "Completed":
        return "success";
      default:
        return "secondary";
    }
  };

  const getBadgeText = (status: string) => {
    switch (status) {
      case "InProgress":
        return "In Progress";
      case "Completed":
        return "Completed";
      default:
        return "Unknown Status";
    }
  };

  const goToReviewDetails = (review: IReview) => {
    navigate(`/myreviews/${review._id}`)
  }


  return (
    <Col md={12}>
      <Row>
        {reviews.map((review, index) => (
          <Col key={index} md={3} className="mt-3 mb-2">
            <Card className="review">
              <Card.Body className="review-card">
                <Card.Title>{review.name}</Card.Title>
                <Card.Text>
                  <Badge
                    text={
                      getBadgeVariant("Completed") === "warning"
                        ? "dark"
                        : "white"
                    }
                    className="badge-text"
                    bg={getBadgeVariant(review.status)}
                  >
                    {getBadgeText(review.status)}
                  </Badge>
                </Card.Text>
                <Row>
                  <Button onClick={() => goToReviewDetails(review)} variant="primary">View Responses</Button>
                  {review.status === "InProgress" && (
                    <Button variant="secondary" className="my-1" onClick={() => showEmailBox(review)}>Send to Reviewer</Button>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

export default MyReviews;
