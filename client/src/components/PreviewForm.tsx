import { Card, Form } from "react-bootstrap";
import './stylesheets/PreviewForm.css';
import TextfieldList from "./TextfieldListPreview";
import QuestionList from "./QuestionListPreview";

function PreviewForm({reviewTitle, questions, textfields }: {reviewTitle: string, questions: {questionType: string, question: string}[], textfields: {questionType: string, question: string}[] }) {
    return (
        <Card className="preview-box">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2">
                <QuestionList questions={questions} />
                <TextfieldList textfields={textfields}/>
            </Card.Body>
        </Card>
    )
}

export default PreviewForm;