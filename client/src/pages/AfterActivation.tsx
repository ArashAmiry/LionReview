import './stylesheets/AfterActivation.css'
import { Link } from "react-router-dom";
import { Col, Container, Nav, Row } from "react-bootstrap";
import React, { ReactNode } from 'react';
import LoginSquare from '../components/LoginSquare';

const AfterActivation: React.FC = () => {

  return (
    <Container className="activation-container d-flex flex-column justify-content-center">
      <Row>
          <Container className='text-container'>
            <p className='activated'>Your account is now activated</p>
            <p className='redirect'>Log in by clicking <Link className='link' to="/login">here</Link></p>
          </Container>
      </Row>
    </Container>

  );
};

export default AfterActivation;