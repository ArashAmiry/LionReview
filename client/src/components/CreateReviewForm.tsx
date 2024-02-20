import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import './stylesheets/CreateReviewForm.css';
import { ChangeEvent } from "react";
import binImage from '../images/bin.png';
import { Form, Container, Row, Col, Image, Button, CloseButton } from 'react-bootstrap';

function CreateReviewForm({ questions, setQuestions }: { questions: string[], setQuestions: (questions: string[]) => void }) {

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
    <Col md={7} className="box rounded">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Questions">
          {questions.map((question, index) => (
            <Form.Group key={index} className='step-row py-3'>
              <Row>
                <Col xs={10}>
                  <Form.Control name="desc" type="text" placeholder={`Write a question here...`} value={question} aria-required="true" onChange={(e) => handleChangeQuestion(e, index)} />
                </Col>
                <Col xs={2}>
                  <CloseButton className="pt-3" onClick={() => deleteQuestion(index)} />
                </Col>
              </Row>
            </Form.Group>
          ))}
          <Button variant="outline-secondary" className="btn-outline-secondary mt-3 mb-3" onClick={() => addQuestion()}>
            Add new step
          </Button>
        </Tab>
        <Tab eventKey="profile" title="Textfield">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed architecto cumque, ut nihil distinctio praesentium modi dicta at quidem minima voluptates. Ducimus, porro in. Totam earum ad ullam tempore molestiae quod dolore natus error quae. Qui, eaque eius. Esse consequuntur at beatae, laboriosam distinctio, tempora eaque voluptas ut recusandae, suscipit sapiente? Laboriosam magnam amet repellat itaque praesentium aliquid hic. Magni alias, quo ex laudantium beatae sequi placeat amet dolore non consequuntur dignissimos exercitationem hic iure earum porro tempore, fugiat deserunt aliquam, ullam sed voluptates eos? Aspernatur ut et non deserunt aliquam, distinctio repudiandae dignissimos saepe possimus excepturi numquam. Explicabo, enim.
        </Tab>
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