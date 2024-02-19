import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import './stylesheets/CreateReviewForm.css';

function CreateReviewForm() {
    return ( 
      <Container>
        <Row>
          <Col></Col>
          <Col className="col-5 box rounded">
            <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="home" title="Questions">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint iure doloremque at laborum cupiditate, repellendus, perspiciatis itaque obcaecati quae earum beatae nam modi cum enim nesciunt possimus laboriosam optio dolore pariatur nisi fuga! Animi nam saepe aut laborum ab nulla, voluptates ratione minima modi, suscipit in perferendis obcaecati. Enim illo minima beatae, tempore commodi ratione, numquam cupiditate nobis laboriosam tenetur illum perspiciatis, perferendis incidunt corrupti nesciunt? Perspiciatis maiores non nam libero ducimus quae deleniti, neque veniam quibusdam dolorum architecto reprehenderit impedit sed quia placeat sit perferendis consequuntur magni eligendi! Sed quasi omnis fugiat cupiditate reprehenderit nulla temporibus impedit, rem repellendus.
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
        <Col></Col>
      </Row>
    </Container>
     );
}

export default CreateReviewForm;