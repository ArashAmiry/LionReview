import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './stylesheets/LoginSquare.css';
import axios from 'axios';
import { error } from 'console';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuthContext } from '../AuthContext';

const LoginSquare: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      .then((response) => {
        if (response.status === 200){
          setIsLoggedIn(true);
          navigate('/');
        } 
      })
      .catch(function (error) {
        setErrorMessage("Try again, wrong credentials.");
        console.log(error);
      });
  };

  return (
    <Container className="loginsquare-container">
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <Form className="loginsquare-form" onSubmit={handleSubmit}>
          <Form.Group className="loginsquare-input">
            <Form.Control
              className='mb-3 bg-body'
              type="text"
              value={username}
              onChange={handleUserChange}
              placeholder="Username or Email"
              required
            />
            <InputGroup>
              <Form.Control
                className='mb-3 bg-body'
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              {password && <InputGroup.Text className='mb-3 visibility bg-body' onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputGroup.Text>}
            </InputGroup>
          </Form.Group>
          {errorMessage && <p className='text-white'>{errorMessage}</p>}
          <Button variant="primary" type="submit" className="login-button">
            Log In
          </Button>

          {/* <Link className="mt-2 forgot-password" to="/forgot-password">Forgot password?</Link> {/* Link to the forgot password page */}
          <hr className='divider' />
          <p className='create-new-text'>Don't have an account?</p>
          <Button variant="primary" className="create-new-account">
            <Link to="/signUp" className="link-button">Create new account</Link>
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginSquare;
