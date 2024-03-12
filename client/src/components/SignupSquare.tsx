import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you have set up React Router
import './stylesheets/LoginSquare.css';
import axios from 'axios';
import { error } from 'console';

const SignupSquare: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/auth/signUp', {
      "username": username,
      "email": email,
      "password": password
    })
      .catch(function (error) {
        console.log(error);
      });
      console.log(res)

  };

  return (
    <Container className="loginsquare-container" style={{ top: '150px', left: '150px' }}>
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="loginsquare-heading">Sign Up</h2>
        <Form className="loginsquare-form" onSubmit={handleSubmit}>
          <Form.Group className="loginsquare-input">
            <Form.Control
              className='mb-3'
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              required
            />
            <Form.Control
              className='mb-3'
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
            <Form.Control
              className='mb-3'
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="loginsquare-submit">
            Sign Up
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default SignupSquare;
