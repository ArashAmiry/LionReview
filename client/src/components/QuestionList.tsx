import { Form } from "react-bootstrap";

function QuestionList({ questions }: { questions: {questionType: string, question: string}[] }) {
    return (
        <>
            {questions
                .filter(question => question.question !== "")
                .map((question, index) => (
                    <Form.Check
                        key={index}
                        id={`step-${index}`} // Add a unique id for each checkbox
                        type="checkbox"
                        label={<p>{question.question}</p>}
                        className="text-start custom-checkbox"
                    />
                ))}
        </>
    )
}

export default QuestionList;