import './stylesheets/LoginPage.css'
import { NavLink } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import React, { ReactNode } from 'react';
import LoginSquare from './LoginSquare';
import SignupSquare from './SignupSquare';

const SignupPage: React.FC = () => {
    const signInMess = "Sign up to";
    const appName = "ReviewTool";

  return (
    <Container className='start-page-container'>
      <div className='login-text-container'>
        <p className='signinto'>{signInMess}</p>
        <p className='app-name'>{appName}</p>
      </div>        
      <SignupSquare />
        
    </Container>

  );
};

export default SignupPage;