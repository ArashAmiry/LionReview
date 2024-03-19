import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './stylesheets/SignUpSquare.css';
import axios from 'axios';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const SignupSquare: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

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
    navigate("/emailSent");
  };

  return (
    <Container className="signup-square-container">
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <h2>Sign up to create free code reviews</h2>
        <Form className="signup-square-form" onSubmit={handleSubmit}>
          <Form.Group className="signup-square-input">
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
            <InputGroup>
              <Form.Control
                className='mb-3'
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              {password && <InputGroup.Text className='mb-3 visibility' onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputGroup.Text>}
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" className="signup-button">
            Sign Up
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default SignupSquare;
