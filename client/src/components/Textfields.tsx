import { ChangeEvent } from "react";
import { Button } from "react-bootstrap";
import TextfieldRow from "./TextfieldRow";

function Textfields({questions, setQuestions}: {questions: {questionType: string, question: string}[], setQuestions: (questions: {questionType: string, question: string}[]) => void}){
      const addTextfield = () => {
        setQuestions([...questions, {questionType: "text", question: ""}]);
      }
    
      const deleteTextfield = (index: number) => {
        const updatedList = [...questions];
        updatedList.splice(index, 1);
        setQuestions(updatedList);
      }
    
      const handleChangeTextfield = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...questions];
        list[index].question = value;
        setQuestions(list);
      }

    return(
        <>
            {questions.map((question, index) => (
              question.questionType === "text" && (
                <TextfieldRow key={index} textfield={question.question} index={index} deleteTextfield={() => deleteTextfield(index)} handleChangeTextfield={(e) => handleChangeTextfield(e, index)} />
              )
            ))}
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3 mb-3" onClick={() => addTextfield()}>
                Add new text question
            </Button>
        </>
    )
}

export default Textfields;