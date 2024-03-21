import Template from "./Template"
import { Button, Card, Form } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import './stylesheets/TemplatePopupField.css'
import { useState } from "react";
import { ITemplate } from "../interfaces/ITemplate";

interface PreviewTemplateProps{
    template: ITemplate;
    onClose: () => void;
    //onUpdateTemplate: (updatedTemplate: Template) => void;
}

const PreviewTemplate:  React.FC<PreviewTemplateProps> = ({template, onClose}) => {

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const HandleEditButton = () => {
        setIsEditModeOn(true)
    }


    function Preview({reviewTitle, questions} : {reviewTitle : string, questions: {questionType: string, question: string}[]}) {
        const binaryQuestions = questions.filter(question => question.questionType === "binary")
        const textQuestions = questions.filter(question => question.questionType === "text")
        return (
            <Card className="sidebar">
                <Card.Title className="m-3">{reviewTitle}</Card.Title>
                <Card.Body className="mx-5 mt-2 sidebar-form">
                    <QuestionList questions={binaryQuestions} />
                    <TextfieldList textfields={textQuestions}/>
                    
                </Card.Body>
            </Card>
        )
    }

    const binaryQuestions = template.questions.filter(question => question.questionType === "binary")
    const textQuestions = template.questions.filter(question => question.questionType === "text")
    const [editedName, setName] = useState(template.name);
    const [editedInfo, setInfo] = useState(template.info);
    const [editedBinaryQuestions, setEditedBinaryQuestions] = useState([...binaryQuestions]);
    const [editedTextQuestions, setEditedTextQuestions] = useState([...textQuestions]);

  
    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Update the template with the edited data  
      
      // Close the edit template modal
      onClose();
    };
    

    
    // Function to handle adding a new checkbox question
    const addBinaryQuestion = () => {
        setEditedBinaryQuestions([...editedBinaryQuestions, {questionType: 'binary', question: 'New Yes/No question'}]);
    };
    const addTextQuestion = () => {
        setEditedTextQuestions([...editedTextQuestions, {questionType: 'text', question: 'New textfield question'}]);
    };

    

    return(
        <div className="popup-container">
            <Preview reviewTitle={template.name} questions={template.questions}></Preview>
            <div className="edit">
                <div className="name-intro-cont">
                <p className="intro-name">Name of Template:</p>
                <h1 className="name">{template.name}</h1>
                <p className="intro-info">Short description:</p>
                <div className="info-container"><p className="info">{template.info}</p></div>
                </div>
                <Button className="edit-button" size="lg" variant="success" onClick={HandleEditButton}>Edit</Button>
                <Button className="close-button" size="lg" variant="light" onClick={onClose}>Close</Button>
            </div>
            {isEditModeOn && (
                    <div className="edit-container">
                    {/* Preview section */}
                    <div className="preview-section">
                    <Form.Group controlId="formTemplateCheckboxQuestions">
                    <Form.Label>Checkbox Questions:</Form.Label>
                    {editedBinaryQuestions.map((question, index) => (
                        <div key={index}> {/* Ensure each element in the map has a unique key */}
                        <Form.Control
                            key={index} 
                            value={question.question} 
                            onChange={(e) => {
                            const updatedQuestions = [...editedBinaryQuestions]; 
                            updatedQuestions[index] = {
                                ...updatedQuestions[index], // Maintain the existing properties
                                question: e.target.value // Update the question text
                            };
                            setEditedBinaryQuestions(updatedQuestions); 
                            }}
                        />
                        </div>
                    ))}
                    <Button variant="primary" onClick={addBinaryQuestion}>
                        Add Checkbox Question
                    </Button>
                        </Form.Group>
              
                        <Form.Group controlId="formTemplateTextfieldQuestions">
                        {editedTextQuestions.map((question, index) => (
                        <div key={index}> {/* Ensure each element in the map has a unique key */}
                        <Form.Control
                            key={index} 
                            value={question.question} 
                            onChange={(e) => {
                            const updatedQuestions = [...editedTextQuestions]; 
                            updatedQuestions[index] = {
                                ...updatedQuestions[index], // Maintain the existing properties
                                question: e.target.value // Update the question text
                            };
                            setEditedTextQuestions(updatedQuestions); 
                            }}
                        />
                        </div>
                    ))}
                          <Button variant="primary" onClick={addTextQuestion}>
                            Add Textfield Question
                          </Button>
                        </Form.Group>
                    </div>
                    {/* Edit section */}
                    <div className="edit-section">
                      {/* Edit form */}
                        <Form.Group controlId="formTemplateName">
                          <Form.Label>Name of Template:</Form.Label>
                          <Form.Control type="text" value={editedName} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
              
                        <Form.Group controlId="formTemplateInfo">
                          <Form.Label>Short description:</Form.Label>
                          <Form.Control as="textarea" rows={3} value={editedInfo} onChange={(e) => setInfo(e.target.value)} />
                        </Form.Group>
                        
                        <Button className="edit-button" type="submit" size="lg" variant="success" onClick={handleSubmit}>
                          Save Changes
                        </Button>
                        <Button className="exit-button" size="lg" variant="light" onClick={onClose}>
                          Exit
                        </Button>
                    </div>
                  </div>
            )}
        </div>
    );

}


export default PreviewTemplate;


