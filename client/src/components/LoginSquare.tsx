import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you have set up React Router
import './stylesheets/LoginSquare.css';
import axios from 'axios';
import { error } from 'console';

const LoginSquare: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/auth/logIn', {
      "username": username,
      "password": password
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container className="loginsquare-container" style={{ top: '150px', left: '150px' }}>
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="loginsquare-heading">Login</h2>
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
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="loginsquare-submit">
            Log In
          </Button>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link> {/* Link to the forgot password page */}
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginSquare;
