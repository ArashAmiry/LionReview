import Template from "./Template"
import { Button, Card, Form } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import './stylesheets/TemplatePopupField.css'
import { useState } from "react";
import { ITemplate } from "../interfaces/ITemplate";
import Question from "./Question";
import Textfields from "./Textfields";
import axios from "axios";

interface PreviewTemplateProps{
    templateId: string;
    template: ITemplate;
    onClose: () => void;
    //onUpdateTemplate: (updatedTemplate: Template) => void;
}

const PreviewTemplate:  React.FC<PreviewTemplateProps> = ({templateId, template, onClose}) => {

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const handleEditButton = () => {
        if (isEditModeOn){
            setIsEditModeOn(false);
        }
        else{
            setIsEditModeOn(true);
        }
    }

    const [isSaved, setIsSaved] = useState(false)

    function Preview({questions} : {questions: {questionType: string, question: string}[]}) {
        const binaryQuestions = questions.filter(question => question.questionType === "binary")
        const textQuestions = questions.filter(question => question.questionType === "text")
        return (
            <Card className="sidebar">
                <Card.Body className="mx-5 mt-2 sidebar-form">
                    <QuestionList questions={binaryQuestions} />
                    <TextfieldList textfields={textQuestions}/>
                    
                </Card.Body>
            </Card>
        )
    }

    const binaryQuestions = template.questions.filter(question => question.questionType === "binary")
    const textfieldQuestions = template.questions.filter(question => question.questionType === "text")

    //const [editedTemplate, setEditedTemplate] = useState<ITemplate>(template);
    //const [editedQuestions, setEditedQuestions] = useState<[{questionType: string, question: string}]>(template.questions);

    const [templateData, setTemplateData] = useState<ITemplate>(template);

    const setBinaryQuestions = (
        questions: { questionType: string; question: string }[]
      ) => {
        setTemplateData((prevTemplateData) => {
          let updatedTemplateData = {...prevTemplateData} // Create a copy of the template
          //updatedTemplateData = questions; // Update binaryQuestions of the current page
          return updatedTemplateData; // Return the updated array of page states
        });
      };
    
      const setTextfieldQuestions = (
        questions: { questionType: string; question: string }[]
      ) => {
            const updatedTextfieldQuestion = {...textfieldQuestions, questions}; 

            return updatedTextfieldQuestion; // Return the updated array of page states
        };

    function EditQuestions({questions, setQuestions, textfields, setTextfields}:{
        questions: { questionType: string, question: string }[], setQuestions: (questions: { questionType: string, question: string }[]) => void,
        textfields: { questionType: string, question: string }[], setTextfields: (textfields: { questionType: string, question: string }[]) => void
    }) {

        return(
            <div className="edit-question-cont">
                <p className="binaryQT">Checkbox questions:</p>
                <Question questions={questions} setQuestions={(questions) => setQuestions(questions)} />
                <p className="binaryQT">Textfield questions:</p>
                <Textfields textfields={textfields} setTextfields={(textfields) => setTextfields(textfields)} />

            </div>

        )

    }


    return(
        <div className="edit-container">
        {!isEditModeOn ? (
            <><Preview questions={template.questions}></Preview>
            <div className="preview">
            <div className="name-intro-cont">
                <p className="intro-name">Name of Template:</p>
                <h1 className="name">{template.name}</h1>
                <p className="intro-info">Short description:</p>
                <div className="info-container"><p className="info">{template.info}</p></div>
            </div>
            <Button className="edit-button" size="lg" variant="success" onClick={handleEditButton}>Edit</Button>
            <Button className="close-button" size="lg" variant="light" onClick={onClose}>Close</Button>
            </div></>
            ):(
                <div className='editModeOn-container'>
                    <EditQuestions 
                    questions={binaryQuestions}
                    setQuestions={(questions) =>
                      setBinaryQuestions(questions)
                    }
                    textfields={textfieldQuestions}
                    setTextfields={(textfields) =>
                      setTextfieldQuestions(textfields)
                    }
                    />
                    <div className="edit-name-info-cont">
                    <div className="name-intro-cont">
                    <p className="intro-name">Name of Template:</p>
                    <h1 className="name">{template.name}</h1>
                    <p className="intro-info">Short description:</p>
                    <div className="info-container"><p className="info">{template.info}</p></div>
                    </div>
                    <Button className="save-button" size="lg" variant="success" onClick={handleEditButton}>Save</Button>
                    <Button className="exit-button" size="lg" variant="light" onClick={handleEditButton}>Exit</Button>
                    </div>
                </div>
                )
            }
        </div>
    )}

export default PreviewTemplate;