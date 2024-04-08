import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "./stylesheets/PresetQuestions.css";
import Form from "react-bootstrap/esm/Form";
import ListGroup from "react-bootstrap/esm/ListGroup";


interface Category {
    name: string;
    questions: {questionType: string, question: string}[];
}

interface PresetQuestionsProps {
    categories: Category[];
    questions: {questionType: string, question: string}[];
    setQuestions: (questions: {questionType: string, question: string}[]) => void;
}

function PresetQuestions ({ categories, questions, setQuestions }: PresetQuestionsProps) {
    const allQuestionsCategory : Category = {name: "All", questions: categories.flatMap(category => category.questions)};
    const [selectedCategory, setSelectedCategory] = useState<Category>(allQuestionsCategory);
    const [selectedQuestions, setSelectedQuestions] = useState<{questionType: string, question: string}[]>([]);

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

    return (
        <Row>
            <Col className="presetQuestionSelectionBox">
                <h4>{selectedCategory.name}</h4>
                <Form>
                    {selectedCategory.questions.map((question, index) => (
                    <Form.Check
                        key={index}
                        type="checkbox"
                        label={question.question}
                        checked={selectedQuestions.includes(question)}
                        onChange={() => handleChange(question)}
                        />
                    ))}
                </Form>
            </Col>
            <Col>
                <Form.Control placeholder="Search..."></Form.Control>
            <h6>Categories</h6>
                <ListGroup>
                <ListGroup.Item
                            key={0}
                            action
                            active={selectedCategory.name === allQuestionsCategory.name}
                            onClick={() => {
                                setSelectedCategory(allQuestionsCategory);
                            }}
                        >
                            {allQuestionsCategory.name}
                        </ListGroup.Item>
                {categories.map((category, index) => (
                        <ListGroup.Item
                            key={index + 1}
                            action
                            active={selectedCategory.name === category.name}
                            onClick={() => {
                                setSelectedCategory(category);
                            }}
                        >
                            {category.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
        
    );
}

export default PresetQuestions;