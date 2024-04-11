import { Button, Card, CardBody, Row, Col, CloseButton } from "react-bootstrap";
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import RangeQuestionList from "./RangeQuestionList";
import './stylesheets/TemplatePopupField.css'
import { useState } from "react";
import { ITemplate } from "../interfaces/ITemplate";
import axios from "axios";
import React from "react";
import Template from "./Template";
import { updateNamedExports } from "typescript";

interface PreviewTemplateProps {
    templateId: string;
    template: ITemplate;
    onClose: () => void;
    deleteTemplate: (id: string) => void;
    //handleDelete: () => void;
    //onUpdateTemplate: (updatedTemplate: Template) => void;
}

const PreviewTemplate: React.FC<PreviewTemplateProps> = ({ templateId, template, onClose, deleteTemplate }) => {

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const handleEditModeButton = () => {
        if (isEditModeOn) {
            setIsEditModeOn(false);
        }
        else {
            setIsEditModeOn(true);
            // setUpdatedName(template.name)
            // setUpdatedInfo(template.info)
            // setBinaryQuestions(template.questions.filter(question => question.questionType === "binary"))
            // setTextQuestions(template.questions.filter(question => question.questionType === "text"))
            // setRangeQuestions(template.questions.filter(question => question.questionType === "range"))
            setIsSaved(false);
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

    const [isDeleted, setIsDeleted] = useState(false)



    const [isDeleteAlert, setIsDeleteAlert] = useState(false)

    function DeleteButton({ isDeleteAlert }: { isDeleteAlert: boolean }) {



        const handleDeleteAlert = () => {
            if (isDeleteAlert) {
                setIsDeleteAlert(false);
            }
            else {
                setIsDeleteAlert(true);
            }
        };

        const handleDeleteTemplate = () => {
            deleteTemplate(templateId);
            onClose()
        }

        return (
            <div className="deleteAlert">
                {!isDeleteAlert ? (
                    <Button className="delete-button" size="lg" variant="dangerdark" onClick={handleDeleteAlert}>Delete Template</Button>
                ) : (
                    <div className="deleteAlertOn">
                        <p className="alert-text">You sure you want to delete template?</p>
                        <div className="alertYesCol"><button type="button" className="alert-button-yes" onClick={handleDeleteTemplate}>Yes</button></div>
                        <div className="alertNoCol"><button type="button"  className="alert-button-no" onClick={handleDeleteAlert}>No</button></div>
                    </div>
                )}
            </div>
        );
    }




    function Preview({ questions }: { questions: { questionType: string, question: string }[] }) {
        return (
            <Card className="template-sidebar">
                <p className="questions-text">Questions:</p>
                <Card.Body className="mx-5 mt-2 sidebar-form">
                    {questions.map((question) => (
                        <>{question.questionType === "binary" &&
                            (<QuestionList questions={[question]} />)}
                            {question.questionType === "text" &&
                                (<TextfieldList textfields={[question]} />)}
                            {question.questionType === "range" &&
                                (<RangeQuestionList rangeQuestions={[question]} />)}
                        </>

                    ))}
                </Card.Body>
            </Card>
        )
    }



    //const binaryQuestions = template.questions.filter(question => question.questionType === "binary")

    const [updatedName, setUpdatedName] = React.useState<string>(
        template.name);
    const [showNameError, setShowNameError] = React.useState<boolean>(false);
    const [showNoQuestionsError, setShowNoQuestionsError] = React.useState<boolean>(false);

    const [updatedInfo, setUpdatedInfo] = React.useState<string>(
        template.info);

    const [textQuestions, setTextQuestions] = React.useState<{ questionType: string, question: string }[]>(
        template.questions.filter(question => question.questionType === "text")
    );
    const [binaryQuestions, setBinaryQuestions] = React.useState<{ questionType: string, question: string }[]>(
        template.questions.filter(question => question.questionType === "binary")
    );
    const [rangeQuestions, setRangeQuestions] = React.useState<{ questionType: string, question: string }[]>(
        template.questions.filter(question => question.questionType === "range")
    );

    const handleBinaryQuestionChange = (index: number, value: string) => {
        const updatedBinaryQuestions = JSON.parse(JSON.stringify(binaryQuestions));
        updatedBinaryQuestions[index].question = value;
        setBinaryQuestions(updatedBinaryQuestions);
        setShowNoQuestionsError(false);
        setIsSaved(false);
    };

    const handleTextQuestionChange = (index: number, value: string) => {
        const updatedTextQuestions = JSON.parse(JSON.stringify(textQuestions));
        updatedTextQuestions[index].question = value;
        setTextQuestions(updatedTextQuestions);
        setShowNoQuestionsError(false);
        setIsSaved(false);
    };

    const handleRangeQuestionChange = (index: number, value: string) => {
        const updatedRangeQuestions = JSON.parse(JSON.stringify(rangeQuestions));
        updatedRangeQuestions[index].question = value;
        setRangeQuestions(updatedRangeQuestions);
        setShowNoQuestionsError(false);
        setIsSaved(false);
    };

    // Function to add new binary question
    const addBinaryQuestion = () => {
        setBinaryQuestions([...binaryQuestions, { questionType: "binary", question: `` }]);
        setIsSaved(false);
    };

    // Function to add new text question
    const addTextQuestion = () => {
        setTextQuestions([...textQuestions, { questionType: "text", question: '' }]);
        setIsSaved(false);
    };

    const addRangeQuestion = () => {
        setRangeQuestions([...rangeQuestions, { questionType: "range", question: `` }]);
        setIsSaved(false);
    };

    const deleteQuestion = (list: { questionType: string, question: string }[], index: number) => {
        const updatedList = [...list];
        const type = updatedList[index].questionType
        console.log(type)
        updatedList.splice(index, 1);
        if (type === "binary") {
            setBinaryQuestions(updatedList)
        } else if (type === "text") {
            setTextQuestions(updatedList)
        } else if (type === "range") {
            setRangeQuestions(updatedList)
        }

        setIsSaved(false);
    }

    const handleTitleChange = (value: string) => {
        const updatedName = value;
        setShowNameError(false);
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
                setIsSaved(true);
                template.name = updatedName;
                template.info = updatedInfo;
                template.questions = [...binaryQuestions, ...textQuestions, ...rangeQuestions];
            })
            .catch(function (error) {
                errorValidateQuestions(binaryQuestions, textQuestions, rangeQuestions);
                if (updatedName.length === 0) setShowNameError(true);
                if (binaryQuestions.length === 0 && textQuestions.length === 0 && rangeQuestions.length === 0) setShowNoQuestionsError(true);
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

        const allQuestionsUpdated = [...binaryQuestions, ...textQuestions, ...rangeQuestions];
        console.log(allQuestionsUpdated)
        const updatedTemplateData: Partial<ITemplate> = {
            name: updatedName,
            info: updatedInfo,
            questions: allQuestionsUpdated
        };
        console.log(templateId)
        console.log(updatedTemplateData)
        updateTemplate(templateId, updatedTemplateData)
    };

    function errorValidateQuestions(binaryQuestions: { question: string }[], textQuestions: { question: string }[], rangeQuestions: { question: string }[]) {
        if (binaryQuestions.length === 0 && textQuestions.length === 0 && rangeQuestions.length === 0) {
            setShowNoQuestionsError(true);
            return;
        }

        setShowNoQuestionsError(true);
        binaryQuestions.map(question => {
            if (question.question.length !== 0) {
                setShowNoQuestionsError(false);
                return;
            }
        })

        textQuestions.map(question => {
            if (question.question.length !== 0) {
                setShowNoQuestionsError(false);
            }
        })

        rangeQuestions.map(question => {
            if (question.question.length !== 0) {
                setShowNoQuestionsError(false);
            }
        })
    }


    return (
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
                        <Button className="edit-button" size="lg" variant="orang" onClick={handleEditModeButton}>Edit</Button>
                        <Button className="close-button" size="lg" variant="btn btn-light" onClick={onClose}>Close</Button>
                    </div></>
            ) : (
                <div className='editModeOn-container'>

                    <Card className="edit-question-cont">
                        <CardBody className="sidebar-form">
                            <p className="question-heading">Checkbox questions:</p>
                            {binaryQuestions.map((question, index) => (
                                <Row className="mt-2">
                                    <Col className="col-md-11">
                                        <input
                                            key={`binaryQuestion${index}`} // Use index to create unique key
                                            className="form-control"
                                            id={`binaryQuestion${index}`} // Use index to create unique ID
                                            placeholder="New Yes/No question..."
                                            value={question.question} // Use question as placeholder
                                            onChange={(e) => handleBinaryQuestionChange(index, e.target.value)}
                                        />
                                    </Col>
                                    <Col className="col-md-1">
                                        <CloseButton className="pt-3"  onClick={() => deleteQuestion(binaryQuestions, index)} />
                                    </Col>
                                </Row>
                            ))}
                            <Button className="add mt-2" variant = "lightblue" onClick={addBinaryQuestion}>Add Checkbox Question</Button>

                            <p className="question-heading">Textfield questions:</p>
                            {textQuestions.map((question, index) => (
                                <Row className="mt-2">
                                    <Col className="col-md-11">
                                        <input
                                            key={`binaryQuestion${index}`} // Use index to create unique key
                                            className="form-control"
                                            id={`binaryQuestion${index}`} // Use index to create unique ID
                                            placeholder="New text question..."
                                            value={question.question} // Use question as placeholder
                                            onChange={(e) => handleTextQuestionChange(index, e.target.value)}
                                        />
                                    </Col>
                                    <Col className="col-md-1">
                                        <CloseButton className="pt-3" onClick={() => deleteQuestion(textQuestions, index)} />
                                    </Col>
                                </Row>
                            ))}
                            <Button className="add mt-2" variant="lightblue"onClick={addTextQuestion}>Add Textfield Question</Button>

                            <p className="question-heading">Range questions:</p>
                            {rangeQuestions.map((question, index) => (
                                <Row className="mt-2">
                                    <Col className="col-md-11">
                                        <input
                                            key={`rangeQuestion${index}`} // Use index to create unique key
                                            className="form-control"
                                            id={`rangeQuestion${index}`} // Use index to create unique ID
                                            placeholder="New range question..."
                                            value={question.question} // Use question as placeholder
                                            onChange={(e) => handleRangeQuestionChange(index, e.target.value)}
                                        />
                                    </Col>
                                    <Col className="col-md-1">
                                        <CloseButton className="pt-3" onClick={() => deleteQuestion(rangeQuestions, index)} />
                                    </Col>
                                </Row>
                            ))}
                            <Button className="add mt-2" variant = "lightblue" onClick={addRangeQuestion}>Add Range Question</Button>
                        </CardBody>
                    </Card>

                    <div className="edit-name-info-cont">
                        <div className="name-intro-cont-edit">
                            <p className="intro-name">Name of Template:</p>
                            <input
                                className="form-control form-control-lg"
                                id="nameId"
                                type="text"
                                value={updatedName}
                                aria-label=".form-control-lg example"
                                onChange={(e) => handleTitleChange(e.target.value)}
                                style={{ borderColor: showNameError ? 'red' : '', boxShadow: showNameError ? '0 0 0 0.2rem rgba(255, 0, 0, 0.25)' : '' }}
                            />
                            <p className="intro-info">Short description:</p>
                            <textarea className="form-control short-description"
                                id="textId"
                                value={updatedInfo}
                                onChange={(e) => handleInfoChange(e.target.value)} />
                            {showNoQuestionsError && <p>You need at least 1 question.</p>}
                        </div>
                        <SaveButton isSaved={isSaved}></SaveButton>
                        <DeleteButton isDeleteAlert={isDeleteAlert}></DeleteButton>
                        <Button className="exit-button" size="lg" variant="light" onClick={handleEditModeButton}>Exit</Button>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default PreviewTemplate;