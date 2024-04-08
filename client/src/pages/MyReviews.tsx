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

  const [statusFilter, setStatusFilter] = useState<ReviewStatusFilter>(
    ReviewStatusFilter.All
  );

  useEffect(() => {
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

  return (
    <body className="body-my-reviews">
    <Container fluid className="myReviewsContainer">
      <Row>
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
            <Col xl={2} className="px-0" />
            <ReviewCardList reviews={filterReviews(userReviews, statusFilter)} />
            <Col xl={2} className="px-0" />
          </Row>
        </Container>
      </Row>
    </Container>
  </body>
  );
};

const ReviewCardList = ({ reviews }: { reviews: IReview[] }) => {
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
    <Col md={8}>
      <Row>
        {reviews.map((review, index) => (
          <Col key={index} md={3} className="mt-4">
            <Card className="review">
              <Card.Body>
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
                    <Button variant="secondary" className="my-1">Send to Reviewer</Button>
                  )}
                </Row>
                <Button variant="danger" className="mx-2 my-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

export default MyReviews;
