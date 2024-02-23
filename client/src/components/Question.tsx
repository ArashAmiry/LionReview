import { Button, Tab } from "react-bootstrap";
import QuestionRow from "./QuestionRow";
import { ChangeEvent } from "react";

function Question({questions, setQuestions}: {questions: string[], setQuestions: (questions: string[]) => void}) {
    const addQuestion = () => {
        setQuestions([...questions, ""]);
      }
    
      const deleteQuestion = (index: number) => {
        const updatedList = [...questions];
        updatedList.splice(index, 1);
        if (updatedList.length === 0) {
          setQuestions([""]);
        }
        else {
          setQuestions(updatedList);
        }
      }
    
      const handleChangeQuestion = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...questions];
        list[index] = value;
        setQuestions(list);
      }

    return (
        <>
            {questions.map((question, index) => (
                <QuestionRow key={index} question={question} index={index} deleteQuestion={() => deleteQuestion(index)} handleChangeQuestion={(e) => handleChangeQuestion(e, index)} />
            ))}
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3 mb-3" onClick={() => addQuestion()}>
                Add new question
            </Button>
        </>
    )
}

export default Question;