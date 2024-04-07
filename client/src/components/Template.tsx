import React, { useEffect, useState } from 'react';
import { Col, Row, Form, ListGroup, Button } from 'react-bootstrap';
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import "./stylesheets/PresetQuestions.css";
import TemplateCard from './TemplateCard';
import { ITemplate } from '../interfaces/ITemplate';
import axios from "axios";

interface TemplateProps {

}

function Template ({}: TemplateProps) {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>({_id:'exampleId', name:'Preview of Template', info:'select template to see a preview', questions:[{questionType:'binary', question:'check'}, {questionType:'text', question:'text'}]});

  const [textQuestions, setTextQuestions] = React.useState<{ questionType: string, question: string }[]>(
    selectedTemplate.questions.filter(question => question.questionType === "text")
  );


  const binaryQuestions = selectedTemplate.questions.filter(question => question.questionType === "binary");

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


  function handleAdd(addedQuestion: {questionType: string, question: string}): void {
    setSelectedQuestions([...selectedQuestions, addedQuestion]);
    setQuestions([...questions, addedQuestion]);
  }

  function handleChange(question: {questionType: string, question: string}): void {
    if (selectedQuestions.includes(question)) {
        handleRemove(question);
    } else {
        handleAdd(question)
    }
  }
*/

  useEffect(() => {
    fetchSavedTemplates();
  }, []);


  const fetchSavedTemplates = async () => {
    const response = await axios.get<ITemplate[]>(`http://localhost:8080/template/getSavedTemplate`) //ändra /templates/...
      .then(function (response) {
        setTemplates(response.data); //ändra (setTemplates, rad 60)
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
        <h4>{selectedTemplate.name}</h4>
        <p>Info: {selectedTemplate.info}</p>
        <Form>
          <QuestionList questions={binaryQuestions} />
          <TextfieldList textfields={textQuestions}/>
        </Form>
        <Button>Use this template</Button>
    </Col>

    <Col>
        <ListGroup>
        {templates.map((name, index) => (
                <ListGroup.Item
                    key={index + 1}
                    action
                    //active={selectedTemplate.name}
                    onClick={() => {setSelectedTemplate(templates[index]);}}
                >
                    {templates[index].name}
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
