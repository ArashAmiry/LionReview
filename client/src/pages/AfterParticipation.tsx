import './stylesheets/AfterParticipation.css'
import { Container, Row } from "react-bootstrap";
import React from 'react';

const AfterParticipation: React.FC = () => {

  return (
    <Container className="participation-container d-flex flex-column justify-content-center">
      <Row>
          <Container className='text-container'>
            <h2 className='participation-text'>Thank you for your participation!</h2>
            <p className='answers-success'>Your answers were submitted successfully.</p>
          </Container>
      </Row>
    </Container>

  );
};

export default AfterParticipation;