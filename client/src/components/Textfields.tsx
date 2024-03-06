import { ChangeEvent } from "react";
import { Button } from "react-bootstrap";
import QuestionRow from "./QuestionRow";
import TextfieldRow from "./TextfieldRow";

function Textfields({textfields, setTextfields}: {textfields: {questionType: string, question: string}[], setTextfields: (questions: {questionType: string, question: string}[]) => void}){
    const addTextfield = () => {
        setTextfields([...textfields, {questionType: "text", question: ""}]);
      }
    
      const deleteTextfield = (index: number) => {
        const updatedList = [...textfields];
        updatedList.splice(index, 1);
        if (updatedList.length === 0) {
          setTextfields([{questionType: "text", question: ""}]);
        }
        else {
          setTextfields(updatedList);
        }
      }
    
      const handleChangeTextfield = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...textfields];
        list[index].question = value;
        setTextfields(list);
      }

    return(
        <>
            {textfields.map((textfield, index) => (
                <TextfieldRow key={index} textfield={textfield.question} index={index} deleteTextfield={() => deleteTextfield(index)} handleChangeTextfield={(e) => handleChangeTextfield(e, index)} />
            ))}
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3 mb-3" onClick={() => addTextfield()}>
                Add new textfield question
            </Button>
        </>
    )
}

export default Textfields;