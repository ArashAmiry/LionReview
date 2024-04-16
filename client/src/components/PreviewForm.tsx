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
    
    const questionsNotEmpty = () => {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].question.length > 0 ){
                return true
            }
        }
    }

    const handleSaveTemplate = () => {
        if (!isSavedActive && questions.length > 0 && questionsNotEmpty()){
        setIsSavedActive(true);
        }
        else if(questions.length < 0 || !questionsNotEmpty()){

        }
        else{
        setIsSavedActive(false);
        }
    }

    return (
        <div style={{"height":'100%'}}>
            {isSavedActive ?(
                <>
                <Card className="preview-box bg-body" >
                    <SaveTemplate questions={questions} onClose={handleSaveTemplate}></SaveTemplate>
                </Card>
                <Button className="save-btn" size="lg" onClick={handleSaveTemplate} variant="light" style={{backgroundColor: "#CD2635 " ,borderColor:"#CD2635", color: "#FFFFFF"}}>Exit</Button>
                </>
            ):(
                <>
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
                {(questions.length > 0 && questionsNotEmpty())? (
                    <Button className="save-btn" size="lg" onClick={handleSaveTemplate} variant="success" style={{backgroundColor: "#F1A30D",borderColor:"#F1A30D"}}>Save Form as Template</Button>
                ):(
                    <Button className="save-btn" size="lg" onClick={handleSaveTemplate} variant="btn btn-light" disabled >Save Form as Template</Button>
                )}
                
                </>
            )}

        </div>
    )
}

export default PreviewForm;

