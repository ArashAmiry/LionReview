import './stylesheets/EmailSent.css'
import { Link } from "react-router-dom";
import { Col, Container, Nav, Row } from "react-bootstrap";
import React, { ReactNode } from 'react';
import LoginSquare from '../components/LoginSquare';

const EmailSent: React.FC = () => {

  return (
    <Container className="email-sent-container d-flex flex-column justify-content-center">
      <Row>
      <Container className='text-container'>
        <p className='last-step'>One last step</p>
            <p className='click-link'>Activate your account by clicking the link in the email</p>
            
          </Container>
      </Row>
    </Container>

  );
};

export default EmailSent;