import { Button, Card, Col, Row } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import "./stylesheets/PreviewFormSidebar.css";

function PreviewFormSidebar({submitReview, addNewPage, reviewTitle, questions, textfields, previousStep} : {submitReview: (e : React.MouseEvent) => void, addNewPage: (e : React.MouseEvent) => void, reviewTitle : string, questions: {questionType: string, question: string}[], textfields : {questionType: string, question: string}[], previousStep: () => void}) {
    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionList questions={questions} />
                <TextfieldList textfields={textfields}/>
                
            </Card.Body>

            <Button size="lg" onClick={(e) => submitReview(e)} variant="success">Create form</Button> 
            <Button size="lg" variant="primary" onClick={addNewPage}>Add New Page</Button>
            <Button size="lg" variant="light" onClick={() => previousStep()}>Back</Button>
        </Card>
    )
}

export default PreviewFormSidebar;