import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import './stylesheets/CreateReviewForm.css';
import { Col } from 'react-bootstrap';
import Question from "./Question";
import PresetQuestions from "./PresetQuestions";
import Textfields from "./Textfields";


function CreateReviewForm({ questions, setQuestions, textfields, setTextfields }: 
  { questions: string[], setQuestions: (questions: string[]) => void, 
    textfields: string[], setTextfields: (textfields: string[]) => void}) {
  return (
    <Col md={12} className="box rounded">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Questions"><Question questions={questions} setQuestions={(questions) => setQuestions(questions)} /></Tab>
        <Tab eventKey="profile" title="Textfields"><Textfields textfields={textfields} setTextfields={(textfields) => setTextfields(textfields)} /></Tab>
        <Tab eventKey="contact" title="Templates">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis atque quis, ratione dignissimos quae, voluptatem ex esse cum similique culpa repellat dicta ipsam? Ipsum facilis nesciunt unde et quibusdam porro natus corporis dolore, ipsa totam pariatur laborum enim perspiciatis adipisci possimus perferendis placeat magnam molestiae non ullam qui consectetur! Obcaecati quae debitis harum inventore placeat corporis eveniet iste modi nam assumenda perspiciatis ad, fugit ut adipisci illo aspernatur, enim consequatur totam temporibus aliquam architecto quis culpa asperiores velit. Cupiditate quas modi aliquid tempora vitae maxime a natus molestias expedita repellendus nesciunt mollitia nulla, autem odio, sapiente omnis voluptatum debitis maiores.
        </Tab>
        <Tab eventKey="PresetQuestions" title="Preset questions">
          <PresetQuestions questions={questions} setQuestions={(questions) => setQuestions(questions)} categories={[
    {
        name: "Code Structure",
        questions: [
            "Is the code modular and organized logically?",
            "Are appropriate naming conventions followed for variables, functions, and classes?",
            "Does the code adhere to the specified style guide (e.g., PEP 8 for Python, ESLint rules for JavaScript)?",
        ]
    },
    {
        name: "Error Handling",
        questions: [
            "Are errors handled gracefully?",
            "Is there appropriate error logging or error reporting mechanisms?",
            "Are potential edge cases and error scenarios accounted for?",
        ]
    },
    {
        name: "Performance",
        questions: [
            "Are there any potential performance bottlenecks?",
            "Are expensive operations optimized?",
            "Is the codebase memory-efficient?",
        ]
    },
    {
        name: "Security",
        questions: [
            "Are there any security vulnerabilities (e.g., SQL injection, XSS) present?",
            "Is sensitive data handled securely?",
            "Are authentication and authorization mechanisms implemented correctly?",
        ]
    },
    // Add more categories and questions as needed
]} />
        </Tab>
      </Tabs>
    </Col>
  );
}

export default CreateReviewForm;