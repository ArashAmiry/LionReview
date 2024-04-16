import React, { useEffect, useState } from 'react';
import { Col, Row, Form, ListGroup, Button } from 'react-bootstrap';
import QuestionList from "./QuestionListPreview";
import TextfieldList from "./TextfieldListPreview";
import RangeQuestionList from "./RangeQuestionList";
import "./stylesheets/PresetQuestions.css";
import { ITemplate } from '../interfaces/ITemplate';
import axios from "axios";


interface TemplateProps {
  questions: { questionType: string, question: string }[];
  setQuestions: (questions: { questionType: string, question: string }[]) => void;
}

interface ICreateTemplate {
  name: string;
  info: string,
  questions: {
    questionType: string
    question: string
  }[],
  isAdded: boolean
}

function Template({ questions, setQuestions }: TemplateProps) {
  const [templates, setTemplates] = useState<ICreateTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ICreateTemplate>({ name: 'select template to see a preview', info: '', questions: [{ questionType: 'binary', question: '' }], isAdded: false });
  const [addedTemplate, setAddedTemplate] = useState<ICreateTemplate[]>([]);
  const [saveButtonText, setSavebuttonText] = useState<string>("Add Template")

  /*   const textQuestions = selectedTemplate.questions.filter(question => question.questionType === "text");
    const binaryQuestions = selectedTemplate.questions.filter(question => question.questionType === "binary");
    const rangeQuestions = selectedTemplate.questions.filter(question => question.questionType === "range") */

  function handleSelect(template: ICreateTemplate): void {
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
    const questionsToRemove = removeTemplate.questions
    questionsToRemove.forEach(questionToRemove => {
      const index = updatedList.findIndex(question => question.question === questionToRemove.question);
      if (index !== -1) {
        updatedList.splice(index, 1);
      }
    });

    if (updatedList.length === 0) {
      setQuestions([{ questionType: "", question: "" }]);
    } else {
      setQuestions(updatedList);
    }
  }

  function handleAdd(selectedTemplate: ICreateTemplate): void {
    console.log(selectedTemplate)
    selectedTemplate.isAdded = true;
    const newAddedTemplates = ([...addedTemplate, selectedTemplate]);
    setAddedTemplate(newAddedTemplates);
    console.log(addedTemplate)

    const addedQuestions = selectedTemplate.questions.map((question) => {
      console.log(question)
      return {
        question: question.question,
        questionType: question.questionType
      };
    });
    console.log("added: " + addedQuestions)
    console.log(questions)
    setQuestions([...questions, ...addedQuestions]);
  }

  function handleAddTemplate(): void {

    if (addedTemplate?.some(template => template === selectedTemplate)) { //Template already added, remove
      handleRemove(selectedTemplate);
      setSavebuttonText("Add Template")
    }
    else { //AddTemplate
      handleAdd(selectedTemplate)
      setSavebuttonText("Remove Template")
    }
  }

  useEffect(() => {
    fetchSavedTemplates();
  }, []);


  const fetchSavedTemplates = async () => {
    const response = await axios.get<ITemplate[]>(`${process.env.REACT_APP_API_URL}/template/getTemplates`) //ändra /templates/...
      .then(function (response) {
        let list: {
          name: string;
          info: string,
          questions: {
            questionType: string
            question: string
          }[],
          isAdded: boolean
        }[] = [];
        response.data.map((res) => {
          list = [...list, {
            name: res.name,
            info: res.info,
            questions: res.questions,
            isAdded: false
          }]
        })
        setTemplates(list); //ändra (setTemplates, rad 60)
        setSelectedTemplate({ name: list[0].name, info: list[0].info, questions: list[0].questions, isAdded: list[0].isAdded });
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
      {selectedTemplate ? (
        <>
          <Col className="presetQuestionSelectionBox">
            <h4 className='template-name-title'>{selectedTemplate.name}</h4>
            <p>{selectedTemplate.info}</p>
            <Form>
              {selectedTemplate.questions.map((question) => (
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
            {selectedTemplate.isAdded ? <Button onClick={handleAddTemplate} variant="dangerdark">{"Remove template"}</Button> :
              <Button onClick={handleAddTemplate} variant="completeform" >{"Add template"}</Button>}


          </Col>

          <Col className='templates-col-adds'>
            <ListGroup>
              {templates.map((template, index) => (
                <ListGroup.Item
                  className='template-items'
                  key={index + 1}
                  action
                  active={template === selectedTemplate && !template.isAdded}
                  onClick={() => { handleSelect(template) }}
                  variant={`${template.isAdded ? 'success' : ''}`}
                >
                  {templates[index].name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </>
      ) : <div>No templates exist</div>}
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
