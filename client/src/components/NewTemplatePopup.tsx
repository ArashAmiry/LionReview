import { Button, Card, CardBody, Row, Col, CloseButton} from "react-bootstrap";
import './stylesheets/newTemplatePopup.css';
import { ITemplate } from "../interfaces/ITemplate";
import axios from "axios";
import React from "react";

interface NewTemplatePopupProps{
    onClose: () => void;
}

const NewTemplatePopup:  React.FC<NewTemplatePopupProps> = ({onClose}) => {


    const [updatedName, setUpdatedName] = React.useState<string>('');

    const [updatedInfo, setUpdatedInfo] = React.useState<string>('');
    
    const [textQuestions, setTextQuestions] = React.useState<{ questionType: string, question: string }[]>(
        [{questionType: 'text', question: 'First text question'}]
    )

    const [binaryQuestions, setBinaryQuestions] = React.useState<{ questionType: string, question: string }[]>(
        [{questionType: 'binary', question: 'First Yes/No question'}]
    );

    const [rangeQuestions, setRangeQuestions] = React.useState<{ questionType: string, question: string }[]>(
        [{questionType: 'range', question: 'First Range question'}]
    );

    const handleBinaryQuestionChange = (index: number, value: string) => {
        const updatedBinaryQuestions = [...binaryQuestions];
        updatedBinaryQuestions[index].question = value;
        setBinaryQuestions(updatedBinaryQuestions);
    };
    
    const handleTextQuestionChange = (index: number, value: string) => {
        const updatedTextQuestions = [...textQuestions];
        updatedTextQuestions[index].question = value;
        setTextQuestions(updatedTextQuestions);
    };

    const handleRangeQuestionChange = (index: number, value: string) => {
        const updatedRangeQuestions = [...rangeQuestions];
        updatedRangeQuestions[index].question = value;
        setRangeQuestions(updatedRangeQuestions);
    };

    // Function to add new binary question
    const addBinaryQuestion = () => {
        setBinaryQuestions([...binaryQuestions, { questionType: "binary", question: `New Yes/No question` }]);
    };

    // Function to add new text question
    const addTextQuestion = () => {
        setTextQuestions([...textQuestions, { questionType: "text", question: `New text question` }]);

    };

    const addRangeQuestion = () => {
        setRangeQuestions([...rangeQuestions, { questionType: "range", question: `Range question` }]);
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
        else if(list[0].questionType === "range"){
            setRangeQuestions(updatedList)
        }
    }

    const handleTitleChange = (value: string) => {
        const updatedName = value
        setUpdatedName(updatedName);
    };

    const handleInfoChange = (value: string) => {
        const updatedInfo = value
        setUpdatedInfo(updatedInfo);
    };


    const createNewTemplate = async (newTemplateData: Partial<ITemplate>) => {
        const response = await axios.post<ITemplate[]>(`http://localhost:8080/template/createTemplate`, newTemplateData) //ändra /templates/...
            .then(function (response) {
            //setSavedTemplates(response.data);
            onClose()
            console.log(response);
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
    

    function handleCreateNewTemplate() {

        const newTemplateData: Partial<ITemplate> = {
            name: updatedName,
            info: updatedInfo,
            questions: [...binaryQuestions, ...textQuestions]
        };
        console.log(newTemplateData)
        createNewTemplate(newTemplateData)
    };

    return(
        <div className='popup-container'>

        <Card className="edit-question-cont">
            <CardBody className="sidebar-form">
                <p className="question-heading">Yes/No questions:</p>
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
                <Button className="add" onClick={addBinaryQuestion}>Add Yes/No Question</Button>

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

                <p className="question-heading">Range questions:</p>
                {rangeQuestions.map((question, index) => (
                    <Row>
                        <Col className="col-md-11">
                        <input
                            key={`rangeQuestion${index}`} // Use index to create unique key
                            className="form-control"
                            id={`rangeQuestion${index}`} // Use index to create unique ID
                            value={question.question} // Use question as placeholder
                            onChange={(e) => handleRangeQuestionChange(index, e.target.value)}
                        />
                        </Col>
                        <Col className="col-md-1">
                        <CloseButton className="pt-3" onClick={() => deleteQuestion(rangeQuestions, index)} />
                        </Col>
                    </Row>
                ))}
                <Button className="add" onClick={addRangeQuestion}>Add Checkbox Question</Button>
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
                        rows={6}
                        value={updatedInfo}
                        onChange={(e) => handleInfoChange(e.target.value)}/>
            </div>
            <Button className="edit-button" size="lg" variant="success" onClick={handleCreateNewTemplate}>Create New Template</Button>
            <Button className="close-button" size="lg" variant="light" onClick={onClose}>Close</Button>
        </div>
    </div>
    )

}

export default NewTemplatePopup;