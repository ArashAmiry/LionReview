import { useEffect, useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "./stylesheets/PresetQuestions.css";
import Form from "react-bootstrap/esm/Form";
import ListGroup from "react-bootstrap/esm/ListGroup";


interface Category {
    name: string;
    questions: string[];
}

interface PresetQuestionsProps {
    categories: Category[];
}

function PresetQuestions ({ categories }: PresetQuestionsProps) {
    const allQuestionsCategory : Category = {name: "All", questions: categories.flatMap(category => category.questions)};
    const [selectedCategory, setSelectedCategory] = useState<Category>(allQuestionsCategory);
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

    function handleRemove(question : string): void {
        const index = selectedQuestions.findIndex((selectedQuestion) => selectedQuestion === question);
        const newSelectedQuestions = [...selectedQuestions];
        newSelectedQuestions.splice(index, 1);
        setSelectedQuestions(newSelectedQuestions);
    }

    function handleAdd(question: string): void {
        setSelectedQuestions([...selectedQuestions, question]);
    }

    function handleChange(question: string): void {
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
                        label={question}
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