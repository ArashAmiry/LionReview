import './stylesheets/LoginPage.css'
import { NavLink } from "react-router-dom";
import { Col, Container, Nav, Row } from "react-bootstrap";
import React, { ReactNode } from 'react';
import LoginSquare from './LoginSquare';

const LoginPage: React.FC = () => {

  return (
    <Container>
      <Row>
        <Col sm={7} className="d-flex flex-column justify-content-center">
          <Container className='text-container'>
            <p className='log-in-to'>Log in to</p>
            <p className='app-name'>ReviewTool</p>
          </Container>
        </Col>
        <Col sm={5}>
          <LoginSquare />
        </Col>
      </Row>
    </Container>

  );
};

export default LoginPage;