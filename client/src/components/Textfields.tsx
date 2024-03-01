import { ChangeEvent } from "react";
import { Button } from "react-bootstrap";
import QuestionRow from "./QuestionRow";
import TextfieldRow from "./TextfieldRow";

function Textfields({textfields, setTextfields}: {textfields: string[], setTextfields: (questions: string[]) => void}){
    const addTextfield = () => {
        setTextfields([...textfields, ""]);
      }
    
      const deleteTextfield = (index: number) => {
        const updatedList = [...textfields];
        updatedList.splice(index, 1);
        if (updatedList.length === 0) {
          setTextfields([""]);
        }
        else {
          setTextfields(updatedList);
        }
      }
    
      const handleChangeTextfield = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...textfields];
        list[index] = value;
        setTextfields(list);
      }

    return(
        <>
            {textfields.map((textfield, index) => (
                <TextfieldRow key={index} textfield={textfield} index={index} deleteTextfield={() => deleteTextfield(index)} handleChangeTextfield={(e) => handleChangeTextfield(e, index)} />
            ))}
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3 mb-3" onClick={() => addTextfield()}>
                Add new textfield question
            </Button>
        </>
    )
}

export default Textfields;