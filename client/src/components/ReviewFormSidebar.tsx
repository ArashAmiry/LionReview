import { Card } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import "./stylesheets/PreviewFormSidebar.css";
import QuestionListReview from "./QuestionListReview";
import TextfieldListReview from "./TextfieldListReview";

function ReviewFormSidebar({textfields, questions} : {textfields: { id: string, question: string }[], questions: { id: string, question: string }[]}) {
    const reviewTitle = "Title";

    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionListReview questions={questions} />
                <TextfieldListReview textfields={textfields}/>
            </Card.Body>
        </Card>
    )
}

export default ReviewFormSidebar;