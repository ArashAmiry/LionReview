import { Card } from "react-bootstrap";
import QuestionList from "./QuestionList";
import TextfieldList from "./TextfieldList";
import "./stylesheets/PreviewFormSidebar.css";

function ReviewFormSidebar({reviewId} : {reviewId: string}) {
    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionList questions={questions} />
                <TextfieldList textfields={textfields}/>
            </Card.Body>
        </Card>
    )
}

export default ReviewFormSidebar;