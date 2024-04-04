import { Button } from "react-bootstrap";
import QuestionRow from "./QuestionRow";
import { ChangeEvent } from "react";

function RangeQuestions({questions, setQuestions}: {questions: {questionType: string, question: string}[], setQuestions: (questions: {questionType: string, question: string}[]) => void}) {
    const addQuestion = () => {
        setQuestions([...questions, {questionType: "range", question: ""}]);
      }
    
      const deleteQuestion = (index: number) => {
        const updatedList = [...questions];
        updatedList.splice(index, 1);
        const rangeQuestions = updatedList.filter(question => question.questionType === "range");
        if (rangeQuestions.length === 0) {
          setQuestions([...updatedList, {questionType: "range", question: ""}]);
        }
        else {
          setQuestions(updatedList);
        }
      }
    
      const handleChangeQuestion = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...questions];
        list[index].question = value;
        setQuestions(list);
      }

    return (
        <>
            {questions.map((question, index) => (
              question.questionType === "range" && (
                <QuestionRow key={index} question={question.question} index={index} deleteQuestion={() => deleteQuestion(index)} handleChangeQuestion={(e) => handleChangeQuestion(e, index)} />
              )
            ))}
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3 mb-3" onClick={() => addQuestion()}>
                Add new question
            </Button>
        </>
    )
}

export default RangeQuestions;