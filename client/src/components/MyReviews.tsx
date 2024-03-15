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

type Review = {
  name: string;
  status: string;
  created: string;
  id: number;
};

enum ReviewStatusFilter {
  All = "All",
  Draft = "Draft",
  InProgress = "In Progress",
  Completed = "Completed",
}

const MyReviews = ({ username }: { username: string }) => {
  const [myReviews, setMyReviews] = useState<Review[]>([{
    name: "Example Review 1",
    id: 69,
    status: "Draft",
    created: "March 8, 2024, 10:00 AM",
  },
  {
    name: "Example Review 2",
    id: 70,
    status: "InProgress",
    created: "March 8, 2024, 10:00 AM",
  },
  {
    name: "Example Review 3",
    id: 71,
    status: "Completed",
    created: "March 8, 2024, 10:00 AM",
  },
  {
    name: "Example Review 4",
    id: 72,
    status: "Completed",
    created: "March 8, 2024, 10:00 AM",
  },
  {
    name: "Example Review 5",
    id: 73,
    status: "Completed",
    created: "March 8, 2024, 10:00 AM",
  }]);

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
  const filterReviews = (reviews: Review[], filter: ReviewStatusFilter): Review[] => {
    return reviews.filter(review => {
      return filter === ReviewStatusFilter.All || review.status.replace(/\s/g, '') === filter.replace(/\s/g, '');
    })
  }

  return (
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
            <ReviewCardList reviews={userReviews} />
            <Col xl={2} className="px-0" />
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

const ReviewCardList = ({ reviews }: { reviews: IReview[] }) => {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Draft":
        return "secondary";
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
      case "Draft":
        return "Draft";
      case "InProgress":
        return "In Progress";
      case "Completed":
        return "Completed";
      default:
        return "Unknown Status";
    }
  };

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
                    bg={getBadgeVariant("Completed")}
                  >
                    {getBadgeText("Completed")}
                  </Badge>
                </Card.Text>
                {review.name !== "Draft" && (
                  <Button variant="primary">View Responses</Button>
                )}
                {review.name === "Draft" && (
                  <Button variant="secondary">Edit</Button>
                )}
                <Button variant="danger" className="mx-2">
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
