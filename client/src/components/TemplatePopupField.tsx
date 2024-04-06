import { Button, Card, CardBody, Row, Col, CloseButton} from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import './stylesheets/TemplatePopupField.css'
import { useState } from "react";
import { ITemplate } from "../interfaces/ITemplate";
import axios from "axios";
import React from "react";

interface PreviewTemplateProps{
    templateId: string;
    template: ITemplate;
    onClose: () => void;
    //onUpdateTemplate: (updatedTemplate: Template) => void;
}

const PreviewTemplate:  React.FC<PreviewTemplateProps> = ({templateId, template, onClose}) => {

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const handleEditModeButton = () => {
        if (isEditModeOn){
            setIsEditModeOn(false);
        }
        else{
            setIsEditModeOn(true);
            setUpdatedName(template.name)
            setUpdatedInfo(template.info)
            setBinaryQuestions(template.questions.filter(question => question.questionType === "binary"))
            setTextQuestions(template.questions.filter(question => question.questionType === "text"))
            setIsSaved(true)
        }
    }

    const [isSaved, setIsSaved] = useState(true)

    function SaveButton({ isSaved }: { isSaved: boolean }) {
        let buttonText = isSaved ? 'Saved' : 'Save Changes';
        let buttonVariant = isSaved ? 'secondary' : 'success';
    
        return (
            <Button className="save-button" size="lg" variant={buttonVariant} disabled={isSaved} onClick={saveTemplate}>
                {buttonText}
            </Button>
        );
    }

    function Preview({questions} : {questions: {questionType: string, question: string}[]}) {
        const binaryQuestions = questions.filter(question => question.questionType === "binary")
        const textQuestions = questions.filter(question => question.questionType === "text")
        return (

            <Card className="sidebar">
                <p className="questions-text">Questions:</p>
                <Card.Body className="mx-5 mt-2 sidebar-form">
                    <QuestionList questions={binaryQuestions} />
                    <TextfieldList textfields={textQuestions}/>
                    
                </Card.Body>
            </Card>
        )
    }

    

    //const binaryQuestions = template.questions.filter(question => question.questionType === "binary")

    const [updatedName, setUpdatedName] = React.useState<string>(
        template.name);

    const [updatedInfo, setUpdatedInfo] = React.useState<string>(
        template.info);

    const [allQuestions, setAllQuestions] = React.useState<{ questionType: string, question: string }[]>(
        template.questions);
    
    const [textQuestions, setTextQuestions] = React.useState<{ questionType: string, question: string }[]>(
        template.questions.filter(question => question.questionType === "text")
    );
    const [binaryQuestions, setBinaryQuestions] = React.useState<{ questionType: string, question: string }[]>(
        template.questions.filter(question => question.questionType === "binary")
    );

    const handleBinaryQuestionChange = (index: number, value: string) => {
        const updatedBinaryQuestions = [...binaryQuestions];
        updatedBinaryQuestions[index].question = value;
        setBinaryQuestions(updatedBinaryQuestions);
        setIsSaved(false);
    };
    
    const handleTextQuestionChange = (index: number, value: string) => {
        const updatedTextQuestions = [...textQuestions];
        updatedTextQuestions[index].question = value;
        setTextQuestions(updatedTextQuestions);
        setIsSaved(false);
    };

    // Function to add new binary question
    const addBinaryQuestion = () => {
        setBinaryQuestions([...binaryQuestions, { questionType: "binary", question: `new binary question` }]);
        setIsSaved(false);
    };

    // Function to add new text question
    const addTextQuestion = () => {
        setTextQuestions([...textQuestions, { questionType: "text", question: `new text question` }]);
        setIsSaved(false);
    };

    const deleteQuestion = (list:{ questionType: string, question: string }[], index: number) => {
        const updatedList = [...list];
        updatedList.splice(index, 1);
        if (list[0].questionType === "binary"){
            setBinaryQuestions(updatedList)
        }
        else if(list[0].questionType === "text"){
            setTextQuestions(updatedList)
        }
      }

      const handleTitleChange = (value: string) => {
        const updatedName = value
        setUpdatedName(updatedName);
        setIsSaved(false);
    };

    const handleInfoChange = (value: string) => {
        const updatedInfo = value
        setUpdatedInfo(updatedInfo);
        setIsSaved(false);
    };

    const updateTemplate = async (templateId: string, updatedTemplateData: Partial<ITemplate>) => {
        const response = await axios.put<ITemplate[]>(`http://localhost:8080/template/editTemplate/${templateId}`, updatedTemplateData) //ändra /templates/...
            
            .then(function (response) {
                //setSavedTemplates(response.data); //ändra (setTemplates, rad 60)
                console.log(response);
                setIsSaved(true)
            })
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
                console.log("error: " + error);
            });
          };
      
          //updateTemplates();
        
    

    function saveTemplate() {

        setAllQuestions(binaryQuestions && textQuestions)
        const updatedTemplateData: Partial<ITemplate> = {
            name: updatedName,
            info: updatedInfo,
            questions: allQuestions
        };
        console.log(templateId)
        console.log(updatedTemplateData)
        updateTemplate(templateId, updatedTemplateData)
    };
  
    


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
            <Button className="edit-button" size="lg" variant="success" onClick={handleEditModeButton}>Edit</Button>
            <Button className="close-button" size="lg" variant="light" onClick={onClose}>Close</Button>
            </div></>
            ):(
                <div className='editModeOn-container'>

                    <Card className="edit-question-cont">
                        <CardBody className="sidebar-form">
                            <p className="question-heading">Checkbox questions:</p>
                            {binaryQuestions.map((question, index) => (
                                <Row>
                                    <Col className="col-md-11">
                                    <input
                                        key={`binaryQuestion${index}`} // Use index to create unique key
                                        className="form-control"
                                        id={`binaryQuestion${index}`} // Use index to create unique ID
                                        value={question.question} // Use question as placeholder
                                        onChange={(e) => handleBinaryQuestionChange(index, e.target.value)}
                                    />
                                    </Col>
                                    <Col className="col-md-1">
                                    <CloseButton className="pt-3" onClick={() => deleteQuestion(binaryQuestions, index)} />
                                    </Col>
                                </Row>
                            ))}
                            <Button className="add" onClick={addBinaryQuestion}>Add Checkbox Question</Button>

                            <p className="question-heading">Textfield questions:</p>
                            {textQuestions.map((question, index) => (
                                <Row>
                                    <Col className="col-md-11">
                                    <input
                                        key={`binaryQuestion${index}`} // Use index to create unique key
                                        className="form-control"
                                        id={`binaryQuestion${index}`} // Use index to create unique ID
                                        value={question.question} // Use question as placeholder
                                        onChange={(e) => handleTextQuestionChange(index, e.target.value)}
                                    />
                                    </Col>
                                    <Col className="col-md-1">
                                    <CloseButton className="pt-3" onClick={() => deleteQuestion(textQuestions, index)} />
                                    </Col>
                                </Row>
                            ))}
                            <Button className="add" onClick={addTextQuestion}>Add Textfield Question</Button>
                        </CardBody>
                    </Card>
                    
                    <div className="edit-name-info-cont">
                        <div className="name-intro-cont">
                        <p className="intro-name">Name of Template:</p>
                        <input  className="form-control form-control-lg" 
                                id="nameId"
                                type="text" value={updatedName} 
                                aria-label=".form-control-lg example" 
                                onChange={(e) => handleTitleChange(e.target.value)}/>
                        <p className="intro-info">Short description:</p>
                        <textarea   className="form-control" 
                                    id="textId" 
                                    value={updatedInfo}
                                    onChange={(e) => handleInfoChange(e.target.value)}/>
                        </div>
                        <SaveButton isSaved={isSaved}></SaveButton>
                        <Button className="exit-button" size="lg" variant="light" onClick={handleEditModeButton}>Exit</Button>
                    </div>
                </div>
                )
            }
        </div>
    )}

export default PreviewTemplate;















/*

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

        const updateTemplate = async (templateId: string, updatedTemplateData: Partial<ITemplate>) => {
        const response = await axios.put(`http://localhost:8080/template/editTemplate/${templateId}`, updatedTemplateData);
        console.log(response.data); // Log the updated template data
        // Handle any further actions after updating the template if needed
    } 

            /*try {
            const response = await axios.put(`http://localhost:8080/template/editTemplate/${templateId}`, updatedTemplateData);
            console.log(response.data); // Log the updated template data
            // Handle any further actions after updating the template if needed
        }catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    console.error('Error response:', axiosError.response.data);
                    console.error('Status code:', axiosError.response.status);
                    console.error('Headers:', axiosError.response.headers);
                } else if (axiosError.request) {
                    console.error('No response received:', axiosError.request);
                } else {
                    console.error('Error:', axiosError.message);
                }
            } else {
                console.error('Unknown error:', error);
            }
        }*/