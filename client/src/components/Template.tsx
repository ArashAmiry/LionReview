import React, { useEffect, useState } from 'react';
import { Col, Row, Form, ListGroup, Button } from 'react-bootstrap';
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import RangeQuestionList from "./RangeQuestionList";
import "./stylesheets/PresetQuestions.css";
import { ITemplate } from '../interfaces/ITemplate';
import axios from "axios";

interface TemplateProps {
  questions: {questionType: string, question: string}[];
  setQuestions: (questions: {questionType: string, question: string}[]) => void;
}

interface ICreateTemplate {
  template: ITemplate, 
  isAdded: boolean
}

function Template ({ questions, setQuestions }: TemplateProps) {
  const [templates, setTemplates] = useState<ICreateTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ICreateTemplate>({template: {_id:'exampleId', name:'select template to see a preview', info:'', questions:[{questionType:'binary', question:''}]}, isAdded: false});
  const [addedTemplate, setAddedTemplate] = useState<ICreateTemplate[]>([]);
  const [saveButtonText, setSavebuttonText] = useState<string>("Add Template")

/*   const textQuestions = selectedTemplate.questions.filter(question => question.questionType === "text");
  const binaryQuestions = selectedTemplate.questions.filter(question => question.questionType === "binary");
  const rangeQuestions = selectedTemplate.questions.filter(question => question.questionType === "range") */

function handleSelect(template: ICreateTemplate): void{
  setSelectedTemplate(template);
  console.log(selectedTemplate)
}

function handleRemove(removeTemplate: ICreateTemplate): void {
  const index = addedTemplate.findIndex((addedTemplate) => addedTemplate === removeTemplate);
  removeTemplate.isAdded = false;
  const newAddedTemplates = addedTemplate
  newAddedTemplates.splice(index, 1);
  setAddedTemplate(newAddedTemplates);

  let updatedList = [...questions];
  const questionsToRemove = removeTemplate.template.questions
  questionsToRemove.forEach(questionToRemove => {
    const index = updatedList.findIndex(question => question.question === questionToRemove.question);
    if (index !== -1) {
      updatedList.splice(index, 1);
    }
  });

  if (updatedList.length === 0) {
    setQuestions([{questionType: "", question: ""}]);
  } else {
    setQuestions(updatedList);
  }
 }

  function handleAdd(selectedTemplate: ICreateTemplate): void {
    selectedTemplate.isAdded = true;
    const newAddedTemplates = ([...addedTemplate, selectedTemplate]);
    setAddedTemplate(newAddedTemplates);
    console.log(addedTemplate)

    const addedQuestions = selectedTemplate.template.questions;
    setQuestions([...questions, ...addedQuestions]);
  }

  function handleAddTemplate(): void{

    if (addedTemplate?.some(template => template.template._id === selectedTemplate.template._id)){ //Template already added, remove
      handleRemove(selectedTemplate);
      setSavebuttonText("Add Template")
    }
    else{ //AddTemplate
      handleAdd(selectedTemplate)
      setSavebuttonText("Remove Template")
    }
  }

  useEffect(() => {
    fetchSavedTemplates();
  }, []);


  const fetchSavedTemplates = async () => {
    const response = await axios.get<ITemplate[]>(`http://localhost:8080/template/getSavedTemplate`) //ändra /templates/...
      .then(function (response) {
        let list: {template: ITemplate, isAdded: boolean}[] = [];
        response.data.map((res) => {
          list = [...list, {template: res, isAdded: false}]
        })
        setTemplates(list); //ändra (setTemplates, rad 60)
        setSelectedTemplate(list[0]);
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

  return (


    <Row>
    <Col className="presetQuestionSelectionBox">
        <h4>{selectedTemplate.template.name}</h4>
        <p>{selectedTemplate.template.info}</p>
        <Form>
          {selectedTemplate.template.questions.map((question) => (
                        <>{question.questionType === "binary" &&
                            (<QuestionList questions={[question]} />)}
                          {question.questionType === "text" && 
                          (<TextfieldList textfields={[question]} />)}  
                          {question.questionType === "range" && 
                          (<RangeQuestionList rangeQuestions={[question]} />)}
                        </>

                    ))}
{/*           <QuestionList questions={binaryQuestions} />
          <TextfieldList textfields={textQuestions}/>
          <RangeQuestionList rangeQuestions={rangeQuestions}></RangeQuestionList> */}
        </Form>
        {selectedTemplate.isAdded ? <Button onClick={handleAddTemplate}>{"Remove template"}</Button> :
        <Button onClick={handleAddTemplate}>{"Add template"}</Button>}
          

    </Col>

    <Col>
        <ListGroup>
        {templates.map((template, index) => (
                <ListGroup.Item
                    key={index + 1}
                    action
                    active={template === selectedTemplate && !template.isAdded}
                    onClick={() => {handleSelect(template)}}
                    variant={`${template.isAdded ? 'success' : ''}`}
                >
                    {templates[index].template.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Col>
</Row>
    
  );
}


export default Template;


/*        <ListGroup.Item
          key={0}
          action
          //active={selectedCategory.name === allQuestionsCategory.name}
          //onClick={() => {setSelectedCategory(allQuestionsCategory);}}
        >
        {selectedTemplate.name}
                </ListGroup.Item> 
                */



 /* 
  useEffect(() => {
    const removedPresetQuestions = selectedQuestions.filter(x => !questions.includes(x));
    removedPresetQuestions.forEach(removeFromSelectedList);
  }, [questions]);

  function handleRemove(removedQuestion: {questionType: string, question: string}): void {
   removeFromSelectedList(removedQuestion);
   removeFromQuestionsList(removedQuestion);
  }

  function removeFromSelectedList(removedQuestion: {questionType: string, question: string}): void {
    const index = selectedQuestions.findIndex((selectedQuestion) => selectedQuestion.question === removedQuestion.question);
    const newSelectedQuestions = [...selectedQuestions];
    newSelectedQuestions.splice(index, 1);
    setSelectedQuestions(newSelectedQuestions);
  }

  function removeFromQuestionsList(removedQuestion: {questionType: string, question: string}): void {
    const index = questions.findIndex((question) => question.question === removedQuestion.question);
    const updatedList = [...questions];
    updatedList.splice(index, 1);
    if (updatedList.length === 0) {
      setQuestions([{questionType: "binary", question: ""}]);
    }
    else {
      setQuestions(updatedList);
    }
  }

          {addedTemplate?.some(template => template._id === selectedTemplate._id) ?(
          <Button onClick={handleAddTemplate}>Remove Template</Button>
        ):(
          <Button onClick={handleAddTemplate}>Add Template</Button>
        )}


  function handleAdd(addedQuestion: {questionType: string, question: string}): void {
    setSelectedQuestions([...selectedQuestions, addedQuestion]);
    setQuestions([...questions, addedQuestion]);
  }
*/
