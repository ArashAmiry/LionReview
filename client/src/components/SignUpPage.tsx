import './stylesheets/SignUpPage.css'
import { NavLink } from "react-router-dom";
import { Col, Container, Nav, Row } from "react-bootstrap";
import React, { ReactNode } from 'react';
import SignupSquare from './SignupSquare';

const SignupPage: React.FC = () => {

  return (
    <Container>
      <Row>
        <Col sm={7} className="d-flex flex-column justify-content-center">
          <Container className='text-container'>
            <p className='log-in-to'>Sign up to</p>
            <p className='app-name'>ReviewTool</p>
          </Container>
        </Col>
        <Col sm={5}>
          <SignupSquare />
        </Col>
      </Row>
    </Container>

  );
};

export default SignupPage;