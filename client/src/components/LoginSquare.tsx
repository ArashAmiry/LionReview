import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Form, Button } from 'react-bootstrap'; // Import Form and Button from react-bootstrap
import './stylesheets/LoginSquare.css'; // Import the CSS file

const LoginSquare: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  return (
    <div className="loginsquare-container d-flex flex-column align-items-center justify-content-center">
      <h2 className="loginsquare-heading">Login</h2>
      <Form className="loginsquare-form" onSubmit={handleSubmit}>
        <Form.Group className="loginsquare-input">
          <Form.Control 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            placeholder="Email" 
            required 
          />
        </Form.Group>
        <Form.Group className="loginsquare-input">
          <Form.Control 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password" 
            required 
          />
        </Form.Group>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link> {/* Link to the forgot password page */}
        </div>
        <Button variant="primary" type="submit" className="loginsquare-submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginSquare;
