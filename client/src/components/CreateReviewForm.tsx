import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import './stylesheets/CreateReviewForm.css';
import { Col } from 'react-bootstrap';
import Question from "./Question";
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
        <Tab eventKey="PresetQuestionaires" title="Preset questionaires">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam vitae animi sequi repellat corporis voluptas? Ex itaque non velit deleniti reprehenderit quisquam temporibus cum, repudiandae minima dolorum eius repellat tempore.
        </Tab>
      </Tabs>
    </Col>
  );
}

export default CreateReviewForm;