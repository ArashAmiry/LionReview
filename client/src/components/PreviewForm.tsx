import { Card, Form, Button } from "react-bootstrap";
import './stylesheets/PreviewForm.css';
import TextfieldList from "./TextfieldListPreview";
import QuestionList from "./QuestionListPreview";
import RangeQuestionListPreview from "./RangeQuestionList";
import { useEffect, useState } from "react";
import SaveTemplate from "./SaveTemplate";
import { QuestionAnswerOutlined } from "@mui/icons-material";

type PreviewFormProps = {
    reviewTitle: string,
    questions: {questionType: string, question: string}[], 
    errorMessage : string
    //onClick: () => void;
}


function PreviewForm({reviewTitle, questions, errorMessage }: PreviewFormProps) {

    const [isSavedActive, setIsSavedActive] = useState<boolean>(false);
    
    const handleSaveTemplate = () => {
        if (isSavedActive){
        setIsSavedActive(false);
        }
        else{
        setIsSavedActive(true);
        }
    }

    return (
        <div>
            {isSavedActive ?(
                <div popup-container>
                    <SaveTemplate questions={questions} onClose={handleSaveTemplate}></SaveTemplate>
                </div>
            ):(
                <Card className="preview-box">
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
                    <Button className="save-btn" size="lg" onClick={handleSaveTemplate} variant="success">Save Form as Template</Button>
                    {errorMessage && (  
                        <Card.Text className="fs-5 fw-bold text-danger">{errorMessage}</Card.Text>
                    )}
                </Card>
            )}

        </div>
    )
}

export default PreviewForm;

