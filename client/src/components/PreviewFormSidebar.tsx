import { Button, Card } from "react-bootstrap";
import QuestionList from "./QuestionList";
import TextfieldList from "./TextfieldList";
import "./stylesheets/PreviewFormSidebar.css";

function PreviewFormSidebar({reviewTitle, questions, textfields, previousStep} : {reviewTitle : string, questions: string[], textfields : string[], previousStep: () => void}) {
    return (
        <Card className="sidebar">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2 sidebar-form">
                <QuestionList questions={questions} />
                <TextfieldList textfields={textfields}/>
                
            </Card.Body>
                <Button size="lg" variant="success">Create form</Button>
                <Button size="lg" variant="light" onClick={() => previousStep()}>Back</Button>
        </Card>
    )
}

export default PreviewFormSidebar;