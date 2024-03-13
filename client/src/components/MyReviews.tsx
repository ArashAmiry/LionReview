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

interface MyReviewsProps {
  username: string;
}

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

const MyReviews = ({ username }: MyReviewsProps) => {
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
  }]);
  
  const [statusFilter, setStatusFilter] = useState<ReviewStatusFilter>(
    ReviewStatusFilter.All
  );

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`http://localhost:8080/review/${username}`)
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
      });
      console.log(response);

    };

    fetchReviews();
  }, [username]);

  const handleChange = (status: ReviewStatusFilter) => {
    setStatusFilter(status);
  }
  const filterReviews = (reviews : Review[], filter : ReviewStatusFilter) : Review[] => {
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
            <ReviewCardList reviews={filterReviews(myReviews, statusFilter)} />
          </Row>
        </Container>
      </Row>
    </Container>
  );
};
 
const ReviewCardList= ({ reviews } : { reviews: Review[] }) => {
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
    <>
    {reviews.map((review) => (
      <Col key={review.id} xl={3} className="mt-4">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{review.name}</Card.Title>
            <Card.Text>
              <Badge
                text={
                  getBadgeVariant(review.status) === "warning"
                    ? "dark"
                    : "white"
                }
                className="badge-text"
                bg={getBadgeVariant(review.status)}
              >
                {getBadgeText(review.status)}
              </Badge>
            </Card.Text>
            {review.status !== "draft" && (
              <Button variant="primary">View Responses</Button>
            )}
            {review.status === "draft" && (
              <Button variant="secondary">Edit</Button>
            )}
            <Button variant="danger" className="mx-2">
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
    </>
  )
}

export default MyReviews;
