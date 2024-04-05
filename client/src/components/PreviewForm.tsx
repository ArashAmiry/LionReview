import { Card, Form } from "react-bootstrap";
import './stylesheets/PreviewForm.css';
import TextfieldList from "./TextfieldListPreview";
import QuestionList from "./QuestionListPreview";
import RangeQuestionListPreview from "./RangeQuestionList";

type PreviewFormProps = {
    reviewTitle: string,
    questions: {questionType: string, question: string}[], 
    errorMessage : string}

function PreviewForm({reviewTitle, questions, errorMessage }: PreviewFormProps) {
    return (
        <Card className="preview-box bg-body">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2">       
            {questions.map((question, index) => (
                    <div key={index}>
                        {question.questionType === "binary" && (
                            <QuestionList questions={[question]} />
                        )}
                        {question.questionType === "text" && (
                            <TextfieldList textfields={[question]} />
                        )}
                        {question.questionType === "range" && (
                            <RangeQuestionListPreview rangeQuestions={[question]} />
                        )}
                    </div>
                ))}
            </Card.Body>
            {errorMessage && (  
                <Card.Text className="fs-5 fw-bold text-danger">{errorMessage}</Card.Text>
            )}
        </Card>
    )
}

export default PreviewForm;